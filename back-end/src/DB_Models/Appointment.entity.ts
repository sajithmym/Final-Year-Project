// Appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from './Patient.entity';
import { Doctor } from './Doctor.entity';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
    patient: Patient;

    @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
    doctor: Doctor;

    @Column()
    appointmentDate: string;

    @Column()
    appointmentTime: string;

    @Column({ default: 'Pending' })
    Isaccepted: string;

    @Column({ nullable: true })
    medician: string;

    @Column({ nullable: true })
    bill_amount: number;
}