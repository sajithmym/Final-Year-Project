import { Controller, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/DB_Models/Patient.entity';
import { Repository } from 'typeorm';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>
    ) { }

    @Get('getAllpatients')
    async findAllUsers(): Promise<Patient[]> {
        return await this.patientRepository.find();
    }
}
