import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import * as bcrypt from 'bcrypt';
import { Patient } from './../DB_Models/Patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { configure } from 'config';

@Injectable()
export class SignupService {
  private readonly sendinblueClient: SibApiV3Sdk.TransactionalSMSApi;
  private readonly otpStore: Map<string, string>;

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
    const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
    apiKey.apiKey = configure.SENDINBLUE_API_KEY;
    this.sendinblueClient = new SibApiV3Sdk.TransactionalSMSApi();
    this.otpStore = new Map();
  }

  async sendOtp(phoneNumber: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const sendSms : any = new SibApiV3Sdk.SendTransacSms({
      sender: configure.SENDER_NAME,
      recipient: `+94${phoneNumber}`,
      content: `Your OTP code is ${otp}`,
    });
    sendSms.sender = configure.SENDER_NAME;
    sendSms.recipient = `+94${phoneNumber}`;
    sendSms.content = `Your OTP code is ${otp}`;

    console.log('OTP:', otp);
    console.log('Phone number:', phoneNumber);
    console.log(sendSms);
    
    try {
      await this.sendinblueClient.sendTransacSms(sendSms);
      this.otpStore.set(phoneNumber, otp);
      console.log('OTP sent successfully to', phoneNumber);
    } catch (error) {
      console.error('Error sending OTP via Sendinblue:', error.message, error.response.body);
      throw new Error('Failed to send OTP. Please try again later.');
    }
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
