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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../Config');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.DB_Host,
      port: config.DB_Port,
      username: config.DB_User,
      password: config.DB_Pass,
      database: config.DB_Name,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
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
  ],
})
export class AppModule {}
