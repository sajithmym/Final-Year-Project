import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  scheduleForm: FormGroup = this.formBuilder.group({
    date: [''],
    time: ['']
  });

  dates: string[] = []; // Populate this array with the dates
  times: string[] = ['8:00am - 8:30am', '8:30am - 9:00am', '9:30am - 10:00am', '10:30am - 11:00am', '2:30pm - 3:00pm', '4:00pm - 4:30pm'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Populate dates array with the next 7 days including today
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      this.dates.push(date.toISOString().split('T')[0]);
    }
  }

  onSubmit(): void {
    console.log(this.scheduleForm.value);
  }
}