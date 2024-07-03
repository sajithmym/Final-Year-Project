// doctor.controller.ts
import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly docService: DoctorService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create_doctor_shedule_time')
    async create(@Body() scheduleTimeData: any): Promise<any> {
        return this.docService.create(scheduleTimeData);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-all-doctors')
    async getDoctors(): Promise<any> {
        return this.docService.getDoctors();
    }

    @UseGuards(JwtAuthGuard)
    @Post('doctors-free-times')
    async getDoctorsFreeTimes(@Body() BodyData: any): Promise<any> {
        return this.docService.getDoctorsFreeTimes(BodyData);
    }

    // Fetches a single doctor's details using their ID
    @UseGuards(JwtAuthGuard)
    @Get('get-Single-details/:doctorId')
    async getDoctorDetails(@Param('doctorId') doctorId: string): Promise<any> {
        return this.docService.getSingleDoctor(doctorId);
    }

    // get Not_Accept_appointments for a doctor
    @UseGuards(JwtAuthGuard)
    @Get('Not_Accept_appointments/:id')
    Not_Accept_appointmentsDoctor(@Param('id') id: string) {
        return this.docService.getNotAcceptedAppoinments(id);
    }

    // get Accept_appointments for a doctor
    @UseGuards(JwtAuthGuard)
    @Get('Accept_appointments/:id')
    getAccept_appointmentsDoctor(@Param('id') id: string) {
        return this.docService.getAcceptedAppoinments(id);
    }

    // update the appoinment Isaccepted status to Accept
    @UseGuards(JwtAuthGuard)
    @Post('accept-appointment')
    async acceptAppointment(@Body() bodyData: any): Promise<any> {
        return this.docService.acceptAppointment(bodyData);
    }

    // update the appoinment Isaccepted status to Finesh
    @UseGuards(JwtAuthGuard)
    @Post('finish-appointment')
    async finishAppointment(@Body() bodyData: any): Promise<any> {
        return this.docService.finishAppointment(bodyData);
    }

    // Delete a appoinment Record
    @UseGuards(JwtAuthGuard)
    @Delete('delete-appointment/:id')
    async deleteAppointment(@Param('id') id: string): Promise<any> {
        return this.docService.deleteAppointment(id);
    }

    // set medichine to the appoinment
    @UseGuards(JwtAuthGuard)
    @Post('set-medichine')
    async setMedichine(@Body() bodyData: any): Promise<any> {
        this.docService.setMedichine(bodyData);
        return { message: 'Medichine set successfully' };
    }

    // get priscrived medichine
    @UseGuards(JwtAuthGuard)
    @Get('get-medichine/:id')
    async getMedichine(@Param('id') id: number): Promise<any> {
        const response = this.docService.getMedichine(id)
        return response;
    }
}