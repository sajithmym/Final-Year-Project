import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleTime } from 'src/DB_Models/ScheduleTime.entity';
import { Doctor } from 'src/DB_Models/Doctor.entity';
import { Appointment } from 'src/DB_Models/Appointment.entity';
import axios from 'axios';
import { configure } from 'Config';

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
        if (scheduleTimeData.date === '' || scheduleTimeData.time === '') {
            console.log('Fill all the fields');
            throw new Error('Fill all the fields');
        }
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
            console.log('The same schedule time already exists');
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

    async sendSMS(phoneNumber: string, message: string): Promise<void> {
        const SMS = {
            messages: [
                {
                    from: configure.CLICKSEND_FROM_PHONE,
                    to: `+94${phoneNumber}`, // Sri Lanka country code is +94
                    body: message,
                },
            ],
        };

        console.log(' ` ` '.repeat(20));
        console.log(SMS);
        try {
            const response = await axios.post(
                'https://rest.clicksend.com/v3/sms/send',
                SMS,
                {
                    auth: {
                        username: configure.CLICKSEND_USERNAME,
                        password: configure.CLICKSEND_API_KEY,
                    },
                },
            );
            console.log(response.data);
            console.log(' ` ` '.repeat(20));
            console.log("\n");

        } catch (error) {
            console.log(error.message);
        }
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

    async getNotAcceptedAppoinments(doctorId: any): Promise<any> {
        const doctor = await this.getSingleDoctor(doctorId);

        if (!doctor) {
            throw new Error('Doctor not found');
        }

        const appointments = await this.appointmentRepository.find({ where: { doctor: doctor, Isaccepted: 'Pending' }, relations: ["patient"] });

        return appointments.map(appointment => ({
            id: appointment.id,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            Isaccepted: appointment.Isaccepted,
            medician: appointment.medician,
            patient: {
                id: appointment.patient.id,
                name: appointment.patient.name,
                phone_number: appointment.patient.phone_number,
                address: appointment.patient.address
            }
        }));
    }

    async getAcceptedAppoinments(doctorId: any): Promise<any> {
        const doctor = await this.getSingleDoctor(doctorId);

        if (!doctor) {
            throw new Error('Doctor not found');
        }

        const appointments = await this.appointmentRepository.find({ where: { doctor: doctor, Isaccepted: 'Accepted' }, relations: ["patient"] });

        return appointments.map(appointment => ({
            id: appointment.id,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            Isaccepted: appointment.Isaccepted,
            medician: appointment.medician,
            patient: {
                id: appointment.patient.id,
                name: appointment.patient.name,
                phone_number: appointment.patient.phone_number,
                address: appointment.patient.address
            }
        }));
    }

    async acceptAppointment(bodyData: any): Promise<any> {
        const appointment: any = await this.ChangeStatus(bodyData.appointmentId, "Accepted")

        let message = `Your appointment with ${appointment.doctor.name} has been confirmed for ${appointment.appointmentDate}, ${appointment.appointmentTime}`

        this.sendSMS(appointment.patient.phone_number, message)

        return { status: 'success' }
    }

    async ChangeStatus(id: number, status: string): Promise<any> {
        const appointment: any = await this.appointmentRepository.findOne({ where: { id: id }, relations: ["doctor", "patient"] });
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        appointment.Isaccepted = status;
        await this.appointmentRepository.save(appointment);
        return appointment;
    }

    async finishAppointment(bodyData: any): Promise<any> {
        const appointment: any = await this.ChangeStatus(bodyData.appointmentId, "Finesh")
        return { status: 'success' }
    }

    async deleteAppointment(id: any): Promise<any> {
        const appointment: any = await this.appointmentRepository.findOne({ where: { id: id } });
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        await this.appointmentRepository.remove(appointment);
        return { status: 'success' };
    }

    async setMedichine(bodyData: any): Promise<any> {
        const appointment: any = await this.appointmentRepository.findOne({ where: { id: bodyData.id } });
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        appointment.medician = bodyData.medichine;
        // console.log(appointment);
        await this.appointmentRepository.save(appointment);
    }

    async getMedichine(id: number): Promise<any> {
        const appointment: any = await this.appointmentRepository.findOne({ where: { id: id } });
        if (!appointment) {
            throw new Error('Appointment not found');
        }

        if (appointment.medician === '') {
            throw new Error('No medician found');
        }
        return JSON.parse(appointment.medician);
    }
}