import { Injectable, InternalServerErrorException, Body } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Patient } from './../DB_Models/Patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { configure } from 'config';

@Injectable()
export class SignupService {
  private readonly otpStore: Map<string, string>;

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
    this.otpStore = new Map();
  }

  async sendOtp(phone_number: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const message = {
      messages: [
        {
          from: configure.CLICKSEND_FROM_PHONE,
          to: `+94${phone_number}`, // Sri Lanka country code is +94
          body: `From Patient Management System... - Your OTP code is ${otp} - Do not share this with anyone.`,
        },
      ],
    };

    console.log("Message");
    console.log(message);

    this.otpStore.set(phone_number, otp);

    console.log("OTP Store",this.otpStore.get(phone_number));
    

    // try {
    //   const response = await axios.post(
    //     'https://rest.clicksend.com/v3/sms/send',
    //     message,
    //     {
    //       auth: {
    //         username: configure.CLICKSEND_USERNAME,
    //         password: configure.CLICKSEND_API_KEY,
    //       },
    //     },
    //   );

    //   console.log(response.data);
      
    //   if (response.data.http_code === 200) {
    //     this.otpStore.set(phone_number, otp);
    //   } else {
    //     throw new InternalServerErrorException('Failed to send OTP. Please try again later.');
    //   }
    // } catch (error) {
    //   throw new InternalServerErrorException(`Error sending OTP via ClickSend: ${error.message}`);
    // }
  }

  async verifyOtpAndCreate(data: any): Promise<boolean> {
    const storedOtp = this.otpStore.get(data.phone_number);

    if (storedOtp !== data.otp) {
      console.log("Stored OTP: " + storedOtp, "Statement",storedOtp,data.otp,storedOtp === data.otp);  // Debugging
      return false;
    }

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = this.patientRepository.create({ ...data, password: hashedPassword });

      await this.patientRepository.save(newUser);
      this.otpStore.delete(data.phone_number); // Clean up the OTP store
      return true;
    } catch (error) {
      console.log(error.Body);
      throw new InternalServerErrorException('Error creating user in the database');
    }
  }
}
