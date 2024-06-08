// Doctor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { Patient } from './Patient.entity';
import { Pharmacy } from './Pharmacy.entity';
import { ScheduleTime } from './ScheduleTime.entity';

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

  @ManyToMany(() => Patient, patient => patient.doctors)
  patients: Patient[];

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.doctors)
  pharmacy: Pharmacy;

  @OneToMany(() => ScheduleTime, scheduleTime => scheduleTime.doctor)
  scheduleTimes: ScheduleTime[];
}