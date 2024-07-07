import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configure } from 'config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: configure.frontendUrl,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });
  app.use(cookieParser());
  await app.listen(configure.port);
  Logger.log(`Server running on http://localhost:${configure.port}`);
}
bootstrap();