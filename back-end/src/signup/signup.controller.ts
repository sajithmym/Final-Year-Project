import { Controller, Post, Body, BadRequestException, InternalServerErrorException, UseGuards, HttpStatus, Res, Get } from '@nestjs/common';
import { SignupService } from './signup.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  async signInToSystem(@Body() data: any, @Res() res: any): Promise<any> {
    try {
      const result: any = await this.signupService.signInToSystem(data);
      console.log('Sign in data:', data);
      if (result) {
        res.cookie('token-Uok-PMS', result.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000, sameSite: 'lax', secure: true }); // expire in 1 hour
        return res.status(HttpStatus.OK).send({
          message: 'Sign in successful',
          User: result.Username,
          ID: result.ID,
          UserType: 'Patient',
        });
      } else {
        throw new BadRequestException('Sign in failed');
      }
    } catch (error) {
      throw new InternalServerErrorException('Sign in failed. Please try again later.');
    }
  }

  @Post('logout')
  async logout(@Res() res: any): Promise<any> {
    res.clearCookie('token-Uok-PMS');
    return res.status(HttpStatus.OK).send({ message: 'Logout successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('is-signed-in')
  checkSignIn(@Res() res: any): any {
    return res.status(HttpStatus.OK).send({ message: 'User is signed in' });
  }

}
