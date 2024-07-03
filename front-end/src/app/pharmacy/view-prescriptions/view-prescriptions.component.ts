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
  appoinmentPrice: number = 0;
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
  setSubTotal(price: number) {
    this.currentAppointment.subTotal = price;
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
    // Request to get all appointments for a doctor
    return this.http.get(`${settings.APIURL}/pharmacy/Finesh_appointments`, { withCredentials: true });
  }

  Buy_appointment(Id: any) {
    if (confirm('Are you sure you want to accept this appointment?')) {
      console.log(Id);
    }
  }
}