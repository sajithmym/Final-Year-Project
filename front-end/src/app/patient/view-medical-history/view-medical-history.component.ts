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
    const PatientId = this.user.ID;
    return this.http.get(`${settings.APIURL}/patient/get_My_appointments/${PatientId}`, { withCredentials: true });
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

  Download_Report(ID: any, name: string) {
    this.http.get(`${settings.APIURL}/patient/Download_Report/${ID}`, {
      responseType: 'blob', // Expect a blob response
      withCredentials: true
    }).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob); // Create a URL for the blob
        const link = document.createElement('a');
        link.href = url;
        link.download = name + '.pdf'; // Set the filename. You might want to dynamically set this.
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Clean up the DOM
        window.URL.revokeObjectURL(url); // Release the created URL
      },
      (error) => {
        console.error(error);
        alert('There was an error downloading the report. Please try again later.');
      }
    );
  }

}
