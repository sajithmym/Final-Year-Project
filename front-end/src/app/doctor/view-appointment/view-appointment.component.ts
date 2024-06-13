import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from 'Static_values';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
  appointments: any = [];
  user: any = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAppointmentsForDoctor().subscribe(
      (appointments) => {
        this.appointments = appointments;
      },
      (error) => {
        console.error(error);
        alert('There was an error fetching appointments. Please try again later.');
      }
    );
  }

  getAppointmentsForDoctor() {
    // Replace with your actual API endpoint
    const doctorId = this.user.ID;
    return this.http.get(`${settings.APIURL}/doctor/appointments/${doctorId}`);
  }
}
