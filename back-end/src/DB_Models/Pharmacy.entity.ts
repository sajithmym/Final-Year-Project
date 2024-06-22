// Pharmacy.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient } from './Patient.entity';
import { Doctor } from './Doctor.entity';

@Entity('pharmacy')
export class Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  phone_number: number;

  @OneToMany(() => Patient, patient => patient.pharmacy, { onDelete: 'CASCADE' })
  patients: Patient[];

  @OneToMany(() => Doctor, doctor => doctor.pharmacy, { onDelete: 'CASCADE' })
  doctors: Doctor[];
}