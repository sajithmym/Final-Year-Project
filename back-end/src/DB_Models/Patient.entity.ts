import { Documents } from './Report_document.entity';
// Patient.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Appointment } from './Appointment.entity';

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

  @OneToMany(() => Appointment, appointment => appointment.patient, { onDelete: 'CASCADE' })
  appointments: Appointment[];

  @OneToMany(() => Documents, document => document.patient, { onDelete: 'CASCADE' })
  Documents: Documents[];
}