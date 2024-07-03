import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './../DB_Models/Appointment.entity';
import { Patient } from 'src/DB_Models/Patient.entity';
import { Doctor } from 'src/DB_Models/Doctor.entity';

@Injectable()
export class PharmacyService {

    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
    ) { }

    // get Finesh_Accept_appointments for a patient
    async getFineshAcceptedAppoinments() {
        const appointments = await this.appointmentRepository.find({ where: { Isaccepted: 'Finesh' }, relations: ["doctor", "patient"] });

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
            patient_name: appointment.patient.name,
            patient_phone_number: appointment.patient.phone_number,
        }));
    }

    setAmount_status_change(id: number, amount: number) {
        throw new Error('Method not implemented.');
    }
}
