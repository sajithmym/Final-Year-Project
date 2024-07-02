import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from 'Static_values';

@Component({
  selector: 'app-view-medical-history',
  templateUrl: './view-medical-history.component.html',
  styleUrls: ['./view-medical-history.component.css']
})
export class ViewMedicalHistoryComponent implements OnInit {
  appointments: any = [];
  user: any = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initialize()
  }

  initialize() {
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
    return this.http.get(`${settings.APIURL}/doctor/Not_Accept_appointments/${doctorId}`);
  }

  Reject_appointment(Id: any) {
    if (confirm('Are you sure you want to reject this appointment?')) {
      this.http.delete(`${settings.APIURL}/doctor/delete-appointment/${Id}`).subscribe(
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
      }).subscribe(
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
