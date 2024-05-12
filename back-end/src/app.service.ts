import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../Config');

@Injectable()
export class AppService {
  getHello(): string {
    return `Server Is Running on Port ${config.port}`;
  }
}
