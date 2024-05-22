// Doctor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doctor')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  username: string;

  @Column({  nullable: false })
  password: string;

}