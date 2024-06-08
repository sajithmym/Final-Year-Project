// doctor.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleTime } from 'src/DB_Models/ScheduleTime.entity';
import { Doctor } from 'src/DB_Models/Doctor.entity';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(ScheduleTime)
        private readonly scheduleTimeRepository: Repository<ScheduleTime>,
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
    ) { }

    async create(scheduleTimeData: any): Promise<any> {
        if (!scheduleTimeData.doctor || !scheduleTimeData.doctor.id) {
            throw new Error('Doctor id not provided');
        }
        const doctor = await this.doctorRepository.findOneBy(scheduleTimeData.doctor.id);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        // Check if the same data exists
        const existingScheduleTime = await this.scheduleTimeRepository.findOne({
            where: {
                date: scheduleTimeData.date,
                time_slot: scheduleTimeData.time,
                doctor: doctor,
            }
        });

        if (existingScheduleTime) {
            throw new Error('The same schedule time already exists');
        }

        const newScheduleTime = this.scheduleTimeRepository.create({
            date: scheduleTimeData.date,
            time_slot: scheduleTimeData.time,
            doctor: doctor,
        });

        return this.scheduleTimeRepository.save(newScheduleTime);
    }
}