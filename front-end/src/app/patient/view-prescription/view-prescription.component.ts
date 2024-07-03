import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from 'Static_values';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})
export class ViewPrescriptionComponent implements OnInit {
  appointments: any = [];
  checkout: boolean = false;
  appoinmentID: number = 0;
  user: any = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initialize()
  }

  ONCheckout(id: number) {
    this.appoinmentID = id;
    this.checkout = true;
  }

  OffCheckout() {
    this.checkout = false;
  }

  initialize() {
    this.getAppointmentsForDoctor().subscribe(
      (appointments: any) => {
        // change each appoinment.medician values
        appointments.forEach((appointment: any) => {
          appointment.medician = JSON.parse(appointment.medician);
        });
        this.appointments = appointments;
        console.log(this.appointments);
      },
      (error) => {
        console.error(error);
        alert('There was an error fetching appointments. Please try again later.');
      }
    );
  }

  getAppointmentsForDoctor() {
    // Replace with your actual API endpoint
    const PatientId = this.user.ID;
    return this.http.get(`${settings.APIURL}/patient/Finesh_appointments/${PatientId}`, { withCredentials: true });
  }

  Buy_appointment(Id: any) {
    if (confirm('Are you sure you want to accept this appointment?')) {
      console.log(Id);
    }
  }
}