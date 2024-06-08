import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { ViewMedicalHistoryComponent } from './patient/view-medical-history/view-medical-history.component';
import { ViewPrescriptionComponent } from './patient/view-prescription/view-prescription.component';
import { ViewPatientInformationComponent } from './doctor/view-patient-information/view-patient-information.component';
import { PrescribeMedicationComponent } from './doctor/prescribe-medication/prescribe-medication.component';
import { ScheduleComponent } from './doctor/schedule/schedule.component';
import { ViewAppointmentComponent } from './doctor/view-appointment/view-appointment.component';
import { ViewPrescriptionsComponent } from './pharmacy/view-prescriptions/view-prescriptions.component';
import { InventoryComponent } from './pharmacy/inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    PharmacyComponent,
    NavBarComponent,
    RegisterComponent,
    SigninComponent,
    BookAppointmentComponent,
    ViewMedicalHistoryComponent,
    ViewPrescriptionComponent,
    ViewPatientInformationComponent,
    PrescribeMedicationComponent,
    ScheduleComponent,
    ViewAppointmentComponent,
    ViewPrescriptionsComponent,
    InventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
