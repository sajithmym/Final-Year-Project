// ScheduleTime.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from './Doctor.entity';

@Entity('scheduleTime')
export class ScheduleTime {
    @PrimaryGeneratedColumn()
    id: number;

    // Add other columns as per your requirements

    @ManyToOne(() => Doctor, doctor => doctor.scheduleTimes)
    doctor: Doctor;
}