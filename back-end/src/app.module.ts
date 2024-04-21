import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { PharmacyController } from './pharmacy/pharmacy.controller';
import { PharmacyService } from './pharmacy/pharmacy.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    PatientController,
    DoctorController,
    PharmacyController,
  ],
  providers: [AppService, PatientService, DoctorService, PharmacyService],
})
export class AppModule {}
