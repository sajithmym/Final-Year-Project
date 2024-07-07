import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';

import { Patient } from 'src/DB_Models/Patient.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DoctorService } from 'src/doctor/doctor.service';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
        private readonly doctorService: DoctorService,
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

    // appoinments set status to payment done
    @UseGuards(JwtAuthGuard)
    @Post('appoinment_status_Payment_done/:id')
    Payment_done(@Param('id') id: number) {
        this.doctorService.ChangeStatus(id, 'Payment Successful');
    }

    @UseGuards(JwtAuthGuard)
    @Get('Download_Report/:id')
    async Download_Report(@Param('id') id: number, @Res() res: Response) {
        const data: any = await this.patientService.Download_Report(id);
        const buffer = data.data; // Assuming this is your PDF buffer
        const fileName = data.name; // Or dynamically generate based on the report

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.send(buffer);
    }
}

