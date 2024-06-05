import { Controller, Post, Body, BadRequestException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { SignupService } from './signup.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) { }

  @Post('send-otp')
  async sendOtp(@Body('phone_number') phoneNumber: string): Promise<any> {
    try {
      await this.signupService.sendOtp(phoneNumber);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to send OTP. Please try again later.');
    }
  }

  @Post('verify-and-create')
  async verifyOtpAndCreate(@Body() data: any): Promise<any> {
    try {
      const result = await this.signupService.verifyOtpAndCreate(data);
      if (result) {
        return { message: 'User created successfully' };
      } else {
        throw new BadRequestException('OTP verification failed or phone number not verified');
      }
    } catch (error) {
      throw new InternalServerErrorException('User creation failed. Please try again later.');
    }
  }

  @Post('signin-to-system')
  async signInToSystem(@Body() data: any): Promise<any> {
    try {
      const result = await this.signupService.signInToSystem(data);
      console.log('Sign in result:', result);
      console.log('Sign in data:', data);
      if (result) {
        return { message: 'Sign in successful', token: result };
      } else {
        throw new BadRequestException('Sign in failed');
      }
    } catch (error) {
      throw new InternalServerErrorException('Sign in failed. Please try again later.');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(): Promise<any> {
    return { message: 'Logout successful' };
  }
}
