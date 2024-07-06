import { Appointment } from './Appointment.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('documents')
export class Documents {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    document_name: string;

    @Column({ nullable: true })
    document_path: string;

    @ManyToOne(() => Appointment, appointment => appointment.Documents, { onDelete: 'CASCADE' })
    appinment: Appointment;
}