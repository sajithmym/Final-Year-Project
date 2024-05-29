import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Patient } from './../DB_Models/Patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { configure } from 'config'; // Adjust the path if necessary
import { Twilio } from 'twilio';

@Injectable()
export class SignupService {
  private readonly twilioClient: Twilio;
  private readonly otpStore: Map<string, string>;

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
    const accountSid = configure.TWILIO_ACCOUNT_SID;
    const authToken = configure.TWILIO_AUTH_TOKEN;
    this.twilioClient = new Twilio(accountSid, authToken);
    this.otpStore = new Map();
  }

  async verifyPhoneNumber(phoneNumber: string): Promise<boolean> {
    try {
      const verification = await this.twilioClient.verify.v2.services(configure.TWILIO_ACCOUNT_SID)
        .verifications
        .create({ to: `+94${phoneNumber}`, channel: 'sms' });

      console.log('Verification initiated:', verification);
      return verification.status === 'pending' || verification.status === 'approved';
    } catch (error) {
      console.error('Error verifying phone number:', error.message);
      return false;
    }
  }

  async sendOtp(phoneNumber: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const message = {
      from: configure.TWILIO_PHONE_NUMBER,
      to: `+94${phoneNumber}`, // Sri Lanka country code is +94
      body: `Your OTP code is ${otp}`,
    };

    console.log('OTP:', otp);
    console.log('Phone number:', phoneNumber);
    console.log(message);

    try {
      const response = await this.twilioClient.messages.create({
        from: message.from,
        to: message.to,
        body: message.body,
      });

      if (response.sid) {
        this.otpStore.set(phoneNumber, otp);
        console.log('OTP sent successfully to', phoneNumber);
      } else {
        console.error('Error sending OTP:', response.errorMessage);
        throw new Error('Failed to send OTP. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending OTP via Twilio:', error.message);
    }
  }

  async verifyOtpAndCreate(data: any): Promise<boolean> {
    const verificationCheck = await this.twilioClient.verify.v2.services(configure.TWILIO_ACCOUNT_SID)
      .verificationChecks
      .create({ to: `+94${data.phoneNumber}`, code: data.otp });

    if (verificationCheck.status === 'approved') {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword

      await this.patientRepository.save(data);
      return true;
    }
    return false;
  }
}
