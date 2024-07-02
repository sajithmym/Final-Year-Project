import { ViewPatientInformationComponent } from './doctor/view-patient-information/view-patient-information.component';
import { ViewPrescriptionComponent } from './patient/view-prescription/view-prescription.component';
import { ViewMedicalHistoryComponent } from './patient/view-medical-history/view-medical-history.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { ScheduleComponent } from './doctor/schedule/schedule.component';
import { PrescribeMedicationComponent } from './doctor/prescribe-medication/prescribe-medication.component';
import { ViewAppointmentComponent } from './doctor/view-appointment/view-appointment.component';
import { InventoryComponent } from './pharmacy/inventory/inventory.component';
import { ViewPrescriptionsComponent } from './pharmacy/view-prescriptions/view-prescriptions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'pharmacy', component: PharmacyComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },

  { path: 'bookAppointment', component: BookAppointmentComponent },
  { path: 'viewMedicalHistory', component: ViewMedicalHistoryComponent },
  { path: 'viewPrescription', component: ViewPrescriptionComponent },

  { path: 'viewPatient', component: ViewPatientInformationComponent },
  { path: 'Schedule', component: ScheduleComponent },
  { path: 'PrescribeMedication', component: PrescribeMedicationComponent },
  { path: 'ViewAppointment', component: ViewAppointmentComponent },

  { path: 'Inventory', component: InventoryComponent },
  { path: 'Pharmacy-View-Prescription', component: ViewPrescriptionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
