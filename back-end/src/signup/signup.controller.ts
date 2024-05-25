import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('Send_OTP')
  async sendOtp(@Body('phone_number') phoneNumber: string): Promise<any> {
    await this.signupService.sendOtp(phoneNumber);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify_and_Create')
  async verifyOtpAndCreate(@Body() data: any): Promise<boolean> {
    return this.signupService.verifyOtpAndCreate(data);
  }
}