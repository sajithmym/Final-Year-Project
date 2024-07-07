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
    const apiUrl = `${settings.APIURL}/patient/Download_Report/${reportId}`;
    this.http.get(apiUrl, { responseType: 'blob', withCredentials: true }).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = this.encodeFileName(reportName, 'pdf');
      document.body.appendChild(anchor); // Required for Firefox
      anchor.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    }, error => {
      console.error('Error downloading the report:', error);
      alert('Failed to download report. Please try again later.');
    });
  }

  private encodeFileName(fileName: string, extension: string): string {
    const safeName = fileName.replace(/[^a-zA-Z0-9 _-]/g, '_');
    return `${encodeURIComponent(safeName)}.${extension}`;
  }


}
