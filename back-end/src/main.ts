import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configure } from 'config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:2222', // Specify the origin of the client application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP Methods
    allowedHeaders: 'Content-Type, Accept', // Allowed HTTP Headers
    credentials: true, // This is important for sending cookies and authorization headers
  });

  await app.listen(configure.port);

  Logger.log(`Server running on http://localhost:${configure.port}`);
}
bootstrap();