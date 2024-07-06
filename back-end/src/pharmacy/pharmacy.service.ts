import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Appointment } from './../DB_Models/Appointment.entity';
import { Documents } from 'src/DB_Models/Report_document.entity';

@Injectable()
export class PharmacyService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
        @InjectRepository(Documents)
        private documentRepository: Repository<Documents>,
    ) { }

    // get Finesh_Accept_appointments for a patient
    async getFineshAcceptedAppoinments() {
        const appointments = await this.appointmentRepository.find({ where: { Isaccepted: In(['Finesh']) }, relations: ["doctor", "patient"] });

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

    //Get payment done appoinments
    async Get_payment_done_Appoinments() {
        const appointments = await this.appointmentRepository.find({ where: { Isaccepted: 'Payment Successful' }, relations: ["doctor", "patient"] });

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
            bill: appointment.bill_amount
        }));
    }

    async setAmount_status_change(id: number, amount: number) {
        const appointment: any = await this.appointmentRepository.findOne({ where: { id: id }, relations: ["doctor", "patient"] });
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        appointment.Isaccepted = "Payment Pending";
        appointment.bill_amount = amount;
        await this.appointmentRepository.save(appointment);
        return appointment;
    }

    async saveReport(id: number, Data: any) {
        const appointment: any = await this.appointmentRepository.findOne({ where: { id: id }, relations: ["doctor", "patient"] });
        if (!appointment) {
            throw new Error('Appointment not found');
        }

        console.log(Data);
        return Data;
    }
}
