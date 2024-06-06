import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { settings } from 'Static_values';

// AuthService
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${settings.APIURL}/signup`;  // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  checkSignIn(): Observable<any> {
    return this.http.get(`${this.apiUrl}/is-signed-in`, { withCredentials: true });
  }
}

// HomeComponent
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSignedIn: boolean = false;
  message: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkSignInStatus();
  }

  checkSignInStatus(): void {
    this.authService.checkSignIn().subscribe({
      next: (response) => {
        this.isSignedIn = true;
        this.message = response.message;
      },
      error: (error) => {
        this.isSignedIn = false;
        this.message = 'User is not signed in';
      }
    });
  }
}
