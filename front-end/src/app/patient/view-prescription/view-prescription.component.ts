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
  message: string = '';

  selected_Appointment: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initialize()
  }

  ONCheckout(id: number) {
    this.appoinmentID = id;
    this.checkout = true;
    this.selected_Appointment = this.appointments.find((appointment: any) => appointment.id === id);
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
        if (appointments.length === 0) {
          this.message = 'No appointments found';
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
    return this.http.get(`${settings.APIURL}/patient/Payment_Pending_appointments/${PatientId}`, { withCredentials: true });
  }

  Payment(Id: any) {
    if (confirm('Are you sure you want to proceed with the payment?')) {
      // call appoinment_status_Payment_done/:id post method to change status to payment done
      this.http.post(`${settings.APIURL}/patient/appoinment_status_Payment_done/${Id}`, {}, { withCredentials: true }).subscribe(
        (response: any) => {
          alert('Payment successful');
          this.initialize();
          this.OffCheckout();
        },
        (error) => {
          console.error(error);
          alert('There was an error processing the payment. Please try again later.');
        }
      );
    }
  }
}