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

  user: any = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDoctors(this.selectedCategory).subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  onDoctorChange() {
    // save the next 7 days in the dates array include today date
    this.dates = [];
    this.selectDate = '';
    this.selectedTime = '';
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      this.dates.push(date.toISOString().split('T')[0]);
    }
  }

  onChangeDate() {
    this.selectedTime = '';
    this.dataService.getTimes(this.selectDate, this.selectedDoctor).subscribe((res: any) => {
      this.times = res;
    });
  }

  bookAppointment() {
    if ((this.selectedDoctor != '') && (this.selectedTime != '') && (this.selectDate != '')) {
      this.dataService.bookAppointment(this.user.ID, this.selectedDoctor, this.selectedTime, this.selectDate).subscribe(
        (response) => {
          alert(response.message);
        },
        (error) => {
          alert(`${error.error.message}; may be the appointment already exists `);
        }
      );
    } else {
      alert('Please select all fields');
    }
  }

}
