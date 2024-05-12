/* eslint-disable prettier/prettier */
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // This specifies the table name
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  UserType: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'int', nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;
}