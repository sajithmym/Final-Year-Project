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

  message: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initialize()
  }

  initialize() {
    this.getAppointmentsForDoctor().subscribe(
      (appointments) => {
        this.appointments = appointments;
        if (this.appointments.length === 0) {
          this.message = 'No appointments found.';
        }
      },
      (error) => {
        this.message = 'There was an error fetching appointments. Please try again later.';
        alert('There was an error fetching appointments. Please try again later.');
      }
    );
  }

  getAppointmentsForDoctor() {
    // Replace with your actual API endpoint
    const doctorId = this.user.ID;
    return this.http.get(`${settings.APIURL}/doctor/Not_Accept_appointments/${doctorId}`, { withCredentials: true });
  }

  Reject_appointment(Id: any) {
    if (confirm('Are you sure you want to reject this appointment?')) {
      this.http.delete(`${settings.APIURL}/doctor/delete-appointment/${Id}`, { withCredentials: true }).subscribe(
        () => {
          this.initialize()
        },
        (error) => {
          console.error(error);
          alert('There was an error rejecting the appointment. Please try again later.');
        }
      );
    }
  }

  Accept_appointment(Id: any) {
    if (confirm('Are you sure you want to accept this appointment?')) {
      this.http.post(`${settings.APIURL}/doctor/accept-appointment`, {
        appointmentId: Id
      }, { withCredentials: true }).subscribe(
        () => {
          this.initialize()
        },
        (error) => {
          console.error(error);
          alert('There was an error accepting the appointment. Please try again later.');
        }
      );
    }
  }

}
