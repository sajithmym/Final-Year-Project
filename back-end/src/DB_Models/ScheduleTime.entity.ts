// ScheduleTime.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from './Doctor.entity';

@Entity('scheduleTime')
export class ScheduleTime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    date: string;

    @Column({ nullable: true })
    time_slot: string;

    @ManyToOne(() => Doctor, doctor => doctor.scheduleTimes, { onDelete: 'CASCADE' })
    doctor: Doctor;
}