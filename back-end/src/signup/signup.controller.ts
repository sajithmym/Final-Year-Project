import { Patient } from './../DB_Models/Patient.entity';
import { Doctor } from './../DB_Models/Doctor.entity';
import { Pharmacy } from './../DB_Models/Pharmacy.entity';
import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(
    private readonly Funtion: SignupService,
    @InjectRepository(Patient)
    private readonly PatientRepository: Repository<Patient>,
    @InjectRepository(Doctor) // Inject Repository<Doctor> for DoctorRepository
    private readonly DoctorRepository: Repository<Doctor>,
    @InjectRepository(Pharmacy) // Inject Repository<Pharmacy> for PharmacyRepository
    private readonly PharmacyRepository: Repository<Pharmacy>,
  ) {}

  @Post()
  // create a new Patient
  async createUser(@Body() patientData: Patient): Promise<{message: string}> {
    console.log(patientData);
    // return await this.PatientRepository.save(patientData);
    return {message: 'User created successfully'};
  }
}