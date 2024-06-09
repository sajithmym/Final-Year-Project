// doctor.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
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
}