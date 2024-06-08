import { Component, OnInit } from '@angular/core';
import { AuthService } from '../home/AuthService';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
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
        this.UserName = this.user.User;
        this.Type = this.user.UserType;
      },
      error: (error) => {
        this.Type = '';
      }
    });
  }
}
