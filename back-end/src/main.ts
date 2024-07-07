import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configure } from 'config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:2222', // Specify the allowed origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  app.use(cookieParser());
  await app.listen(configure.port);
  Logger.log(`Server running on http://localhost:${configure.port}`);
}
bootstrap();