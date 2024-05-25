import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configure } from 'config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../Config');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(config.port);
  Logger.log(`Server running on http://localhost:${configure.port}`);
}
bootstrap();
