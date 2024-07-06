import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configure } from 'config';
import * as cookieParser from 'cookie-parser';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:2222',
    credentials: true,
  });

  console.log(ConfigModule);

  await app.listen(configure.port);

  Logger.log(`Server running on http://localhost:${configure.port}`);
}
bootstrap();