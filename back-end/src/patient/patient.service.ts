import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';

import { Appointment } from './../DB_Models/Appointment.entity';
import { Patient } from 'src/DB_Models/Patient.entity';
import { Doctor } from 'src/DB_Models/Doctor.entity';
import { Documents } from 'src/DB_Models/Report_document.entity';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        @InjectRepository(Documents)
        private documentRepository: Repository<Documents>,
    ) { }

    async setAppointments(data: any): Promise<any> {
        const patient = await this.patientRepository.findOneBy({ id: data.patientId });
        const doctor = await this.doctorRepository.findOneBy({ id: data.doctorId });

        if (!patient || !doctor) {
            throw new Error('Patient or doctor not found');
        }

        const existingAppointment = await this.appointmentRepository.findOne({
            where: {
                // patient: patient,
                doctor: doctor,
                appointmentDate: `${data.date}`,
                appointmentTime: `${data.time}`
            }
        });

        if (existingAppointment) {
            throw new Error('Appointment already exists');
        }

        const appointment = new Appointment();
        appointment.patient = patient;
        appointment.doctor = doctor;
        appointment.appointmentDate = `${data.date}`;
        appointment.appointmentTime = `${data.time}`;

        return await this.appointmentRepository.save(appointment);
    }

    async get_Payment_Pending_Appoinments(id: number): Promise<any> {
        const patient = await this.patientRepository.findOneBy({ id: id });

        if (!patient) {
            throw new Error('patient not found');
        }
        const appointments = await this.appointmentRepository.find({ where: { patient: patient, Isaccepted: 'Payment Pending' }, relations: ["doctor", "patient"] });

        if (!appointments) {
            throw new Error('No appointments found');
        }

        return appointments.map(appointment => ({
            id: appointment.id,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            Isaccepted: appointment.Isaccepted,
            medician: appointment.medician,
            doctor_name: appointment.doctor.name,
            patient_name: patient.name,
            bill: appointment.bill_amount,
            address: appointment.patient.address,
        }));
    }

    async getMyAppoinments(patientId: any): Promise<any> {
        const patient = await this.patientRepository.findOneBy({ id: patientId });

        if (!patient) {
            throw new Error('patient not found');
        }

        const appointments = await this.appointmentRepository.find({ where: { patient: patient }, relations: ["doctor", "Documents"] });

        return appointments.map(appointment => ({
            id: appointment.id,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            Isaccepted: appointment.Isaccepted,
            medician: appointment.medician,
            doctor: {
                name: appointment.doctor.name,
                phone_number: appointment.doctor.phone_number,
                specialization: appointment.doctor.specialization
            },
            reports: appointment.Documents,

        }));
    }

    async Download_Report(id: number): Promise<any> {
        const Report = await this.documentRepository.findOneBy({ id: id });
        if (!Report) {
            throw new Error('Report not found');
        }

        let path = Report.document_path;

        // Read the pdf file using path and return as buffer
        try {
            const fileBuffer = await fs.readFile(path);
            return { data: fileBuffer, name: Report.document_name };
        } catch (error) {
            throw new Error('Failed to read the report file');
        }
    }
}