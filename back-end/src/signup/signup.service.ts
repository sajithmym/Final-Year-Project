import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Patient } from './../DB_Models/Patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { configure } from 'config';
import axios from 'axios';

@Injectable()
export class SignupService {
  private readonly otpStore: Map<string, string>;

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
    this.otpStore = new Map();
  }

  async sendOtp(phoneNumber: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const message = {
      messages: [
        {
          from: configure.CLICKSEND_FROM_PHONE,
          to: `+94${phoneNumber}`, // Sri Lanka country code is +94
          body: `Your OTP code is ${otp}`,
        },
      ],
    };

    try {
      const response = await axios.post(
        'https://rest.clicksend.com/v3/sms/send',
        message,
        {
          auth: {
            username: configure.CLICKSEND_USERNAME,
            password: configure.CLICKSEND_API_KEY,
          },
        },
      );

      if (response.data.http_code === 200) {
        this.otpStore.set(phoneNumber, otp);
      } else {
        throw new InternalServerErrorException('Failed to send OTP. Please try again later.');
      }
    } catch (error) {
      throw new InternalServerErrorException(`Error sending OTP via ClickSend: ${error.message}`);
    }
  }

  async verifyOtpAndCreate(data: { phoneNumber: string, otp: string, password: string }): Promise<boolean> {
    const { phoneNumber, otp, password } = data;
    const storedOtp = this.otpStore.get(phoneNumber);

    if (storedOtp !== otp) {
      return false;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.patientRepository.create({ ...data, password: hashedPassword });

      await this.patientRepository.save(newUser);
      this.otpStore.delete(phoneNumber); // Clean up the OTP store
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user in the database');
    }
  }
}
