import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  inputValue: string = ''; // Variable to store input value
  inputValueMobileNumber: string = ''; // Variable to store input value
  inputValuePassword: string = ''; // Variable to store input value
  inputvalueAddress: string = ''; // Variable to store input value
  apiData: any; // Variable to store API response

  message: string = ''; // Variable to store static message

  // get baseurl from localstorage
  baseurl = localStorage.getItem('PATIENT MANAGEMENT SYSTEM backend baseurl');

  constructor(private http: HttpClient) { }

  makeApiRequest() {
    // Check if all fields are filled
    if (this.inputValue != '' && this.inputValueMobileNumber != '' && this.inputValuePassword != '' && this.inputvalueAddress != '') {
      // Validate phone number (assuming it should be a 9 digit Sri Lankan number begin with 7)
      const phoneNumberPattern = /^7[0-9]{8}$/;
      // console.log(`Number : ${this.inputValueMobileNumber} -- ${phoneNumberPattern.test(this.inputValueMobileNumber)}`);
      if (!phoneNumberPattern.test(this.inputValueMobileNumber)) {
        this.message = 'Invalid phone number.';
        this.disableMessage();
        return;
      }

      // Validate address (assuming it should not be empty)
      if (this.inputvalueAddress.trim() === '') {
        this.message = 'Invalid address';
        this.disableMessage();
        return;
      }

      // Validate password (it should be at least 8 characters long, include a mix of uppercase and lowercase letters, numbers, and special characters)
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-])[A-Za-z\d!@#$%^&*()_+=\-]{8,}$/;
      console.log(`Password : ${this.inputValuePassword} -- ${passwordPattern.test(this.inputValuePassword)}`); // Debugging
      if (!passwordPattern.test(this.inputValuePassword)) {
        this.message = 'Invalid password.';
        this.disableMessage();
        return;
      }

      const apiUrl = `${this.baseurl}/signup`;

      const postData = {
        name: this.inputValue,
        phone_number: this.inputValueMobileNumber,
        address: this.inputvalueAddress,
        password: this.inputValuePassword
      };

      this.http.post(apiUrl, postData).subscribe(
        (data: any) => {
          console.log('POST Request Response:', data);
          this.apiData = data;
          this.message = ' - Data Inserted Successfully - '
          this.disableMessage();
          this.resetForm();
        },
        (error) => {
          this.message = 'Error Occurred while Inserting Data'
          this.disableMessage();
        },
      );
    } else {
      this.message = ' Please Fill All The Fields --)'
      this.disableMessage();
    }
  }

  resetForm() {
    this.inputValue = '';
    this.inputValueMobileNumber = '';
    this.inputValuePassword = '';
    this.inputvalueAddress = '';
  }

  // Disable the message after 1 seconds
  disableMessage() {
    setTimeout(() => {
      this.message = '';
    }, 2500);
  }
}
