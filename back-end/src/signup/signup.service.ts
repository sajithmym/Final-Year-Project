
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupService {
  create(userData: any) {
    return 'User created successfully in service';
  }
}