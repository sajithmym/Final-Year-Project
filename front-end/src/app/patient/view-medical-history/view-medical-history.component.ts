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

  downloadReport(reportId: number, reportName: string): void {
    this.http.get(`${settings.APIURL}/patient/Download_Report/${reportId}`, { responseType: 'blob', withCredentials: true }).subscribe(
      (response: Blob) => { // Corrected responseType to 'blob' and adjusted the response type here
        const blob = new Blob([response], { type: 'application/pdf' }); // Directly use the response as it's already a Blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = reportName + '.pdf';
        document.body.appendChild(a); // Append the element to the body before triggering the click
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a); // Clean up by removing the element after the download
      },
      (error) => {
        console.error(error);
        alert('There was an error downloading the report. Please try again later.');
      }
    );
  }

}
