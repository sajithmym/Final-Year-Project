// Doctor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Patient } from './Patient.entity';
import { Pharmacy } from './Pharmacy.entity';
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

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.doctors)
  pharmacy: Pharmacy;

  @OneToMany(() => ScheduleTime, scheduleTime => scheduleTime.doctor)
  scheduleTimes: ScheduleTime[];
}