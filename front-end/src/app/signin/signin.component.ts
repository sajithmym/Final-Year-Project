import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from 'Static_values';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  phoneNumber: string = '';
  password: string = '';
  apiData: any;
  message: string = '';

  constructor(private http: HttpClient) { }

  signIn() {
    if (this.phoneNumber != '' && this.password != '') {
      const phoneNumberPattern = /^7[0-9]{8}$/;

      if (!phoneNumberPattern.test(this.phoneNumber)) {
        this.message = 'Invalid phone number.';
        this.disableMessage();
        return;
      }

      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-])[A-Za-z\d!@#$%^&*()_+=\-]{8,}$/;
      if (!passwordPattern.test(this.password)) {
        this.message = 'Invalid password.';
        this.disableMessage();
        return;
      }

      const apiUrl = `${settings.APIURL}/signup/signin-to-system`;

      const postData = {
        phone_number: this.phoneNumber,
        password: this.password,
      };

      this.http.post(apiUrl, postData, { withCredentials: true }).subscribe(
        (data: any) => {
          this.apiData = data;
          this.message = 'Sign in successful';
          this.disableMessage();
          this.resetForm();
          localStorage.setItem('User-login-uok-pms', JSON.stringify(this.apiData));
          window.location.href = `${settings.FrontendUrl}`;
        },
        (error) => {
          this.message = 'Incorrect login information';
          this.disableMessage();
        }
      );
    } else {
      this.message = 'Please fill all the fields';
      this.disableMessage();
    }
  }

  resetForm() {
    this.phoneNumber = '';
    this.password = '';
  }

  disableMessage() {
    setTimeout(() => {
      this.message = '';
    }, 1000);
  }

}