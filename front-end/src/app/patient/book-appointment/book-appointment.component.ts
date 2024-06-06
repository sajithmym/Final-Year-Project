import { Component } from '@angular/core';
import { DataService } from './dataService';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  categories = ['General', 'Pediatric', 'Cardiology'];
  selectedCategory: string = '';
  doctors: any = [];
  selectedDoctor: string = '';
  times = [];
  selectedTime: string = '';

  constructor(private dataService: DataService) { }

  onCategoryChange() {
    this.dataService.getDoctors(this.selectedCategory).subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  onDoctorChange() {
    this.dataService.getTimes(this.selectedDoctor).subscribe((times) => {
      this.times = times;
    });
  }

  bookAppointment() {
    this.dataService.bookAppointment(this.selectedDoctor, this.selectedTime).subscribe((response) => {
      console.log(response);
    });
  }
}
