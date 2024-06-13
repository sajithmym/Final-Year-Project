import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleTime } from 'src/DB_Models/ScheduleTime.entity';
import { Doctor } from 'src/DB_Models/Doctor.entity';
import { Appointment } from 'src/DB_Models/Appointment.entity';

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(ScheduleTime)
        private readonly scheduleTimeRepository: Repository<ScheduleTime>,
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
    ) { }

    async create(scheduleTimeData: any): Promise<any> {
        const doctor = await this.getSingleDoctor(scheduleTimeData.doctor.id);
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

        return await this.scheduleTimeRepository.save(newScheduleTime);
    }

    async getDoctors(): Promise<Doctor[]> {
        return await this.doctorRepository.find();
    }

    async getDoctorsFreeTimes(obj: any): Promise<ScheduleTime[]> {
        if (!obj.doctorId) {
            throw new Error('Doctor id not provided');
        }
        const doctor = await this.getSingleDoctor(obj.doctorId);
        return await this.scheduleTimeRepository.find({
            where: {
                date: obj.Date,
                doctor: doctor,
            }
        });
    }

    async getSingleDoctor(doctorId: any): Promise<Doctor> {
        return await this.doctorRepository.findOneBy({ id: doctorId });
    }

    async getAppointmentsForDoctor(doctorId: any): Promise<any> {
        const doctor = await this.getSingleDoctor(doctorId);

        if (!doctor) {
            throw new Error('Doctor not found');
        }

        const appointments = await this.appointmentRepository.find({ where: { doctor: doctor }, relations: ["patient"] });

        return appointments.map(appointment => ({
            id: appointment.id,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            patient: {
                id: appointment.patient.id,
                name: appointment.patient.name,
                phone_number: appointment.patient.phone_number,
                address: appointment.patient.address
            }
        }));
    }

}