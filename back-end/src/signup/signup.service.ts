import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import * as bcrypt from 'bcrypt';
import { Patient } from './../DB_Models/Patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

const config = require('../../Config');

@Injectable()
export class SignupService {
  private readonly twilioClient: Twilio;
  private readonly otpStore: Map<string, string>;

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
    this.twilioClient = new Twilio(config.TWILIO_SID, config.TWILIO_TOKEN);
    this.otpStore = new Map();
  }

  async sendOtp(phoneNumber: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(phoneNumber, otp);

    await this.twilioClient.messages.create({
      body: `Your OTP code is ${otp}`,
      from: config.NUMBER,
      to: `+94${phoneNumber}`,
    });
  }

  async verifyOtpAndCreate(data: any): Promise<boolean> {
    const storedOtp = this.otpStore.get(data.phoneNumber);
    if (storedOtp === data.otp) {
      this.otpStore.delete(data.phoneNumber);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      await this.patientRepository.save(data);
      return true;
    }
    return false;
  }
}