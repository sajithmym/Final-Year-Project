// Appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from './Patient.entity';
import { Doctor } from './Doctor.entity';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient, patient => patient.appointments)
    patient: Patient;

    @ManyToOne(() => Doctor, doctor => doctor.appointments)
    doctor: Doctor;

    @Column()
    appointmentDate: string;

    @Column()
    appointmentTime: string;

    @Column({ default: false })
    Isaccepted: boolean;

    @Column()
    medician: string;
}