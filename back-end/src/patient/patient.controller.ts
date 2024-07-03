import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/DB_Models/Patient.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('getAllpatients')
    async findAllUsers(): Promise<Patient[]> {
        return await this.patientRepository.find();
    }

    @UseGuards(JwtAuthGuard)
    @Post('set-appointments')
    async setAppointments(@Body() DatafromFrontend: any): Promise<any> {
        await this.patientService.setAppointments(DatafromFrontend);
        return { message: 'Appointment set successfully' };
    }

    // get Finesh_Accept_appointments for a patient
    @UseGuards(JwtAuthGuard)
    @Get('Payment_Pending_appointments/:id')
    Payment_Pending_appointmentsDoctor(@Param('id') id: number) {
        return this.patientService.get_Payment_Pending_Appoinments(id);
    }

    // get My_appointments for a patient
    @UseGuards(JwtAuthGuard)
    @Get('get_My_appointments/:id')
    get_My_appointments(@Param('id') id: string) {
        return this.patientService.getMyAppoinments(id);
    }
}
