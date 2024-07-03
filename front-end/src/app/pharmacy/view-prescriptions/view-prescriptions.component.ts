import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from 'Static_values';

@Component({
  selector: 'app-view-prescriptions',
  templateUrl: './view-prescriptions.component.html',
  styleUrls: ['./view-prescriptions.component.css']
})
export class ViewPrescriptionsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  appointments: any = [];
  checkout: boolean = false;
  appoinmentID: number = 0;
  appointmentPrice: number | undefined;
  user: any = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');

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
        console.log(this.appointments);
      },
      (error) => {
        console.error(error);
        alert('There was an error fetching appointments. Please try again later.');
      }
    );
  }

  get_Finish_Appointments() {
    // Request to get all appointments for a doctor
    return this.http.get(`${settings.APIURL}/pharmacy/Finesh_appointments`, { withCredentials: true });
  }
}