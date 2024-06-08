// Patient.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Doctor } from './Doctor.entity';
import { Pharmacy } from './Pharmacy.entity';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  phone_number: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => Doctor, doctor => doctor.patients)
  @JoinTable()
  doctors: Doctor[];

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.patients)
  pharmacy: Pharmacy;
}