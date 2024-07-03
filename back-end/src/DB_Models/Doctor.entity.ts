// Doctor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ScheduleTime } from './ScheduleTime.entity';
import { Appointment } from './Appointment.entity';

@Entity('doctor')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  phone_number: number;

  @Column({ nullable: false })
  specialization: string;

  @OneToMany(() => Appointment, appointment => appointment.doctor, { onDelete: 'CASCADE' })
  appointments: Appointment[];

  @OneToMany(() => ScheduleTime, scheduleTime => scheduleTime.doctor, { onDelete: 'CASCADE' })
  scheduleTimes: ScheduleTime[];
}