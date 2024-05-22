import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'patient', component : PatientComponent},
  {path : 'doctor', component : DoctorComponent},
  {path : 'pharmacy', component : PharmacyComponent},
  {path : 'signup', component : RegisterComponent},
  {path : 'signin', component : SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
