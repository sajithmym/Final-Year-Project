import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  phone_number: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  password: string;
}