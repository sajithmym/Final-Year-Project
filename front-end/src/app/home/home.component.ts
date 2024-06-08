import { Component, OnInit } from '@angular/core';
import { AuthService } from './AuthService';
import { settings } from 'Static_values';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSignedIn: boolean = false;
  message: string = '';
  user = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');

  UserName = '';
  Type = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkSignInStatus();
  }

  checkSignInStatus(): void {
    this.authService.checkSignIn().subscribe({
      next: (response) => {
        this.isSignedIn = true;
        this.UserName = this.user.User;
        this.Type = this.user.UserType;
        this.message = response.message;
      },
      error: (error) => {
        this.isSignedIn = false;
        this.message = 'User is not signed in';
        localStorage.removeItem('User-login-uok-pms');
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        this.isSignedIn = false;
        this.message = response.message;
        localStorage.removeItem('User-login-uok-pms');
        window.location.href = `${settings.FrontendUrl}`;
      },
      error: (error) => {
        this.message = 'Logout failed. Please try again.';
      }
    });
  }

}
