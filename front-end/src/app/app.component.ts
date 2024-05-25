import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Patient management system';

  constructor() {
    // Set a baseurl
    localStorage.setItem('PATIENT MANAGEMENT SYSTEM backend baseurl', 'http://localhost:5670');
  }

}
