// doctor.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly docService: DoctorService) { }

    @Post('create_doctor_shedule_time')
    async create(@Body() scheduleTimeData: any): Promise<any> {
        console.log(scheduleTimeData);
        return this.docService.create(scheduleTimeData);
    }

    @Get('get-all-doctors')
    async getDoctors(): Promise<any> {
        return this.docService.getDoctors();
    }

    @Post('doctors-free-times')
    async getDoctorsFreeTimes(@Body() BodyData: any): Promise<any> {
        return this.docService.getDoctorsFreeTimes(BodyData);
    }

    // Fetches a single doctor's details using their ID
    @Get('get-Single-details/:doctorId')
    async getDoctorDetails(@Param('doctorId') doctorId: string): Promise<any> {
        return this.docService.getSingleDoctor(doctorId);
    }

    // get Not_Accept_appointments for a doctor
    @Get('Not_Accept_appointments/:id')
    Not_Accept_appointmentsDoctor(@Param('id') id: string) {
        return this.docService.getNotAcceptedAppoinments(id);
    }

    // get Accept_appointments for a doctor
    @Get('Accept_appointments/:id')
    getAccept_appointmentsDoctor(@Param('id') id: string) {
        return this.docService.getAcceptedAppoinments(id);
    }

    // update the appoinment Isaccepted status to true
    @Post('accept-appointment')
    async acceptAppointment(@Body() bodyData: any): Promise<any> {
        return this.docService.acceptAppointment(bodyData);
    }

    // Delete a appoinment Record
    @Delete('delete-appointment/:id')
    async deleteAppointment(@Param('id') id: string): Promise<any> {
        return this.docService.deleteAppointment(id);
    }
}