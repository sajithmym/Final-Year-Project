import { settings } from 'Static_values';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-patient-information',
  templateUrl: './view-patient-information.component.html',
  styleUrls: ['./view-patient-information.component.css']
})
export class ViewPatientInformationComponent implements OnInit {
  users: any[] = [];
  message: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const apiUrl = `${settings.APIURL}/patient/getAllpatients`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log('GET Request Response:', data);
        this.users = data;
      },
      () => {
        this.message = 'Error Occurred while fetching users';
      },
    );
  }
}
