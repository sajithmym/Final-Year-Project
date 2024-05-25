/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Runing(): string {
    console.log('Server Is Running...');
    return `Server Is Running...`;
  }
}
