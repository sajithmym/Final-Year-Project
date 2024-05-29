import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('Send_OTP')
  async sendOtp(@Body('phone_number') phoneNumber: string): Promise<any> {
    const isVerified = await this.signupService.verifyPhoneNumber(phoneNumber);
    if (isVerified) {
      await this.signupService.sendOtp(phoneNumber);
      return { message: 'OTP sent successfully' };
    } else {
      return { message: 'Phone number verification failed. Please try again.' };
    }
  }

  @Post('verify_and_Create')
  async verifyOtpAndCreate(@Body() data: any): Promise<any> {
    const result = await this.signupService.verifyOtpAndCreate(data);
    if (result) {
      return { message: 'User created successfully' };
    } else {
      return { message: 'OTP verification failed or phone number not verified' };
    }
  }
}
