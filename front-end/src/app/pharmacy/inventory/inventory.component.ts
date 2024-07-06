import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from 'Static_values';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  constructor(private http: HttpClient) { }

  appointments: any = [];
  checkout: boolean = false;
  appoinmentID: number = 0;
  appointmentPrice: number | undefined;
  user: any = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');

  message: string = '';

  showPopup: boolean = false;
  currentAppointment: any = null;

  openSetSubTotalPopup(appointment: any) {
    this.currentAppointment = appointment;
    this.showPopup = true;
  }

  // Method to close the popup
  closePopup() {
    this.showPopup = false;
  }

  // Method to set the sub total
  setSubTotal() {
    this.http.post(`${settings.APIURL}/pharmacy/setAmount-status-change/${this.appoinmentID}`,
      { amount: this.appointmentPrice }, { withCredentials: true }).subscribe(
        (response: any) => {
          this.initialize();
          alert('invoice sent successfully...');
        },
        (error) => {
          console.error(error);
          alert('There was an error setting the Price. Please try again later...');
        }
      );

    this.closePopup();
  }

  ngOnInit(): void {
    this.initialize()
  }

  ONCheckout(id: number) {
    this.appoinmentID = id;
    this.showPopup = true;
    this.checkout = true;
    let current = this.appointments.find((appointment: any) => appointment.id == id);
    this.currentAppointment = current;
  }

  OffCheckout() {
    this.checkout = false;
  }

  initialize() {
    this.get_Finish_Appointments().subscribe(
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

  get_Finish_Appointments() {
    // Request to get all appointments for a doctor
    return this.http.get(`${settings.APIURL}/pharmacy/paid_appointments`, { withCredentials: true });
  }

  Upload_Report(Appointment_ID: number, event: any) {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('report', file, file.name);

      // Adjust the URL to match your API endpoint
      this.http.post(`${settings.APIURL}/pharmacy/UploadReport/${Appointment_ID}`, formData, {
        withCredentials: true,
        reportProgress: true, // If you want to track the upload progress
        observe: 'events' // If you want to receive events, including the progress
      }).subscribe(
        response => {
          console.log('Upload successful', response);
        },
        error => {
          console.error('Upload failed', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}