import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './../DB_Models/Appointment.entity';
import { Patient } from 'src/DB_Models/Patient.entity';
import { Doctor } from 'src/DB_Models/Doctor.entity';

@Injectable()
export class PatientService {

    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
    ) { }

    async setAppointments(data: any): Promise<any> {
        const patient = await this.patientRepository.findOneBy({ id: data.patientId });
        const doctor = await this.doctorRepository.findOneBy({ id: data.doctorId });

        if (!patient || !doctor) {
            throw new Error('Patient or doctor not found');
        }

        const existingAppointment = await this.appointmentRepository.findOne({
            where: {
                patient: patient,
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

    async getFineshAcceptedAppoinments(id: number): Promise<any> {
        const patient = await this.patientRepository.findOneBy({ id: id });

        if (!patient) {
            throw new Error('patient not found');
        }
        const appointments = await this.appointmentRepository.find({ where: { patient: patient, Isaccepted: 'Finesh' }, relations: ["doctor"] });

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
            patient_name: patient.name
        }));
    }
}