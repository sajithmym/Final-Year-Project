import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');

  UserName = '';
  Type = '';

  constructor() {
    this.UserName = this.user.User;
    this.Type = this.user.UserType;
  }
}
