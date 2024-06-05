import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { ViewMedicalHistoryComponent } from './patient/view-medical-history/view-medical-history.component';
import { ViewPrescriptionComponent } from './patient/view-prescription/view-prescription.component';
import { ViewPatientInformationComponent } from './doctor/view-patient-information/view-patient-information.component';

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
    ViewPatientInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
