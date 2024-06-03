import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from 'Static_values';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  inputValue: string = '';
  inputValueMobileNumber: string = '';
  inputValuePassword: string = '';
  inputValueAddress: string = '';
  otp: string = ''; // Variable to store OTP
  showOtpPopup: boolean = false; // Variable to show/hide OTP popup

  apiData: any;
  message: string = '';

  constructor(private http: HttpClient) { }

  closeOtpPopup() {
    this.showOtpPopup = false;
  }

  sendOtp() {
    if (this.inputValue != '' && this.inputValueMobileNumber != '' && this.inputValuePassword != '' && this.inputValueAddress != '') {
      const phoneNumberPattern = /^7[0-9]{8}$/;

      if (!phoneNumberPattern.test(this.inputValueMobileNumber)) {
        this.message = 'Invalid phone number.';
        this.disableMessage();
        return;
      }

      if (this.inputValueAddress.trim() === '') {
        this.message = 'Invalid address';
        this.disableMessage();
        return;
      }

      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-])[A-Za-z\d!@#$%^&*()_+=\-]{8,}$/;
      if (!passwordPattern.test(this.inputValuePassword)) {
        this.message = 'Invalid password.';
        this.disableMessage();
        return;
      }

      const apiUrl = `${settings.APIURL}/signup/send-otp`;

      const postData = {
        phone_number: this.inputValueMobileNumber,
      };

      this.http.post(apiUrl, postData).subscribe(
        (data: any) => {
          console.log('OTP sent:', data);
          this.message = 'OTP sent successfully. Please check your mobile.';
          this.showOtpPopup = true; // Show OTP popup
          this.disableMessage();
        },
        (error) => {
          this.message = 'Error occurred while sending OTP';
          this.disableMessage();
        }
      );
    } else {
      this.message = 'Please fill all the fields';
      this.disableMessage();
    }
  }

  verifyOtp() {
    const apiUrl = `${settings.APIURL}/signup/verify-and-create`;

    const postData = {
      phone_number: this.inputValueMobileNumber,
      name: this.inputValue,
      address: this.inputValueAddress,
      password: this.inputValuePassword,
      otp: this.otp,
    };

    this.http.post(apiUrl, postData).subscribe(
      (data: any) => {
        console.log('User registered:', data);
        this.apiData = data;
        this.message = 'Data Inserted Successfully';
        this.disableMessage();
        this.resetForm();
        this.showOtpPopup = false; // Hide OTP popup
      },
      (error) => {
        this.message = 'Error occurred while inserting data';
        this.disableMessage();
      }
    );
  }

  resetForm() {
    this.inputValue = '';
    this.inputValueMobileNumber = '';
    this.inputValuePassword = '';
    this.inputValueAddress = '';
  }

  disableMessage() {
    setTimeout(() => {
      this.message = '';
    }, 2500);
  }
}
