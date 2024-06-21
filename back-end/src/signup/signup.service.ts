import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { configure } from 'config';
import { JwtService } from '@nestjs/jwt';

import { Pharmacy } from 'src/DB_Models/Pharmacy.entity';
import { Doctor } from './../DB_Models/Doctor.entity';
import { Patient } from './../DB_Models/Patient.entity';
import axios from 'axios';

@Injectable()
export class SignupService {
  private readonly otpStore: Map<string, string>;

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly DoctorRepository: Repository<Doctor>,
    @InjectRepository(Pharmacy)
    private readonly pharmacyRepository: Repository<Pharmacy>,
    private jwtService: JwtService,
  ) {
    this.otpStore = new Map();
  }

  async sendOtp(phoneNumber: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const smsContent = {
      messages: [{
        from: "Uok_PMS",
        destinations: [{ to: `+94${phoneNumber}` }], // Prefixing with Sri Lanka's country code +94
        text: `Your OTP for Patient Management System is: ${otp}. Please do not share it with anyone.`
      }]
    };

    this.otpStore.set(phoneNumber, otp);
    // console.log("OTP for", phoneNumber, "is", this.otpStore.get(phoneNumber));

    try {
      const response = await axios.post('https://rge44p.api.infobip.com/sms/2/text/advanced', smsContent, {
        headers: {
          'Authorization': `App ${configure.api_key_for_infobip}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.status !== 200) {
        throw new Error('Infobip API responded with non-200 status code.');
      }
      // console.log("Infobip response:", response.data);  // Debugging
    } catch (error) {
      console.error("Error sending OTP with Infobip:", error.message);
      throw new InternalServerErrorException('Sending OTP failed. Please try again later.');
    }
  }

  async verifyOtpAndCreate(data: any): Promise<boolean> {
    const storedOtp = this.otpStore.get(data.phone_number);

    if (storedOtp !== data.otp) {
      console.log("Stored OTP: " + storedOtp, "Statement", storedOtp, data.otp, storedOtp === data.otp);  // Debugging
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

  async signInToSystem(data: any): Promise<object> {
    const user = await this.patientRepository.findOne({ where: { phone_number: data.phone_number } });
    if (user && bcrypt.compareSync(data.password, user.password)) {
      let payload = { sub: user.id, User: user.name, UserType: "Patient", MobileNumber: user.phone_number };
      return {
        access_token: this.jwtService.sign(payload),
        Username: user.name,
        ID: user.id,
        Type: "Patient",
        Number: user.phone_number,
      };
    }
    const doc = await this.DoctorRepository.findOne({ where: { phone_number: data.phone_number } });
    if (doc && bcrypt.compareSync(data.password, doc.password)) {
      let payload = { sub: doc.id, User: doc.name, UserType: "Doctor", MobileNumber: doc.phone_number };
      return {
        access_token: this.jwtService.sign(payload),
        Username: doc.name,
        ID: doc.id,
        Type: "Doctor",
        Number: doc.phone_number
      };
    }
    const Phar = await this.pharmacyRepository.findOne({ where: { phone_number: data.phone_number } });
    if (Phar && bcrypt.compareSync(data.password, Phar.password)) {
      let payload = { sub: Phar.id, User: Phar.name, UserType: "Pharmacy", MobileNumber: Phar.phone_number };
      return {
        access_token: this.jwtService.sign(payload),
        Username: Phar.name,
        ID: Phar.id,
        Type: "Pharmacy",
        Number: Phar.phone_number,
      };
    }
    throw new BadRequestException('Invalid phone number or password');
  }
}
