// doctor.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly docService: DoctorService) { }

    @Post('create_doctor_shedule_time')
    async create(@Body() scheduleTimeData: any): Promise<any> {
        console.log(scheduleTimeData);
        return this.docService.create(scheduleTimeData);
    }
}