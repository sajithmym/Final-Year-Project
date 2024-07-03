import { Patient } from 'src/DB_Models/Patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('documents')
export class Documents {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    document_name: string;

    @Column({ nullable: true })
    document_path: string;

    @ManyToOne(() => Patient, patient => patient.Documents, { onDelete: 'CASCADE' })
    patient: Patient;
}