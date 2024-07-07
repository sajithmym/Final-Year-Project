/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Runing(): string {
    console.log('Server Is Running...');
    const currentDateTime = new Date().toLocaleString();
    return `Server Is Running... - ${currentDateTime} -`;
  }
}
