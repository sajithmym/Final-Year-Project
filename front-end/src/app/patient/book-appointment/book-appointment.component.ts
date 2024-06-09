import { Component, OnInit } from '@angular/core';
import { DataService } from './dataService';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  categories = ['General', 'Pediatric', 'Cardiology'];
  selectedCategory: string = '';
  doctors: any = [];
  selectedDoctor: string = '';
  times: any = [];
  selectedTime: string = '';
  selectDate: string = '';
  dates: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDoctors(this.selectedCategory).subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  onDoctorChange() {
    // save the next 7 days in the dates array include today date
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      this.dates.push(date.toISOString().split('T')[0]);
    }
  }

  onChangeDate() {
    this.dataService.getTimes(this.selectDate, this.selectedDoctor).subscribe((res: any) => {
      this.times = res;
    });
  }

  bookAppointment() {
    if ((this.selectedDoctor != '') && (this.selectedTime != '') && (this.selectDate != '')) {
      this.dataService.bookAppointment(this.selectedDoctor, this.selectedTime, this.selectDate).subscribe((response) => {
        console.log(response);
      });
    } else {
      alert('Please select all fields');
    }
  }
}
