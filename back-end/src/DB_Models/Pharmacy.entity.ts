// Pharmacy.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pharmacy')
export class Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  username: string;

  @Column({  nullable: false })
  password: string;
}