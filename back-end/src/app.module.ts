import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { PharmacyController } from './pharmacy/pharmacy.controller';
import { PharmacyService } from './pharmacy/pharmacy.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { SignupController } from './signup/signup.controller';
import { SignupService } from './signup/signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './DB_Models/Patient.entity';
import { Doctor } from './DB_Models/Doctor.entity';
import { Pharmacy } from './DB_Models/Pharmacy.entity';

import { JwtModule } from '@nestjs/jwt';
import { configure } from 'config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ScheduleTime } from './DB_Models/ScheduleTime.entity';
import { Appointment } from './DB_Models/Appointment.entity';
import { Documents } from './DB_Models/Report_document.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: configure.JWTsecret,
      signOptions: { expiresIn: '60m' },
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configure.DB_Host,
      port: Number(configure.DB_Port),
      username: configure.DB_User,
      password: configure.DB_Pass,
      database: configure.DB_Name,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Patient, Doctor, Pharmacy, ScheduleTime, Appointment, Documents]),
  ],

  controllers: [
    AppController,
    PatientController,
    DoctorController,
    PharmacyController,
    LoginController,
    SignupController,
  ],

  providers: [
    AppService,
    PatientService,
    DoctorService,
    PharmacyService,
    LoginService,
    SignupService,
    JwtAuthGuard,
  ],

})
export class AppModule { }
