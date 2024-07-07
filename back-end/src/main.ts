import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configure } from 'config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
      } else {
        // Allow any origin or you can perform a check against a whitelist of allowed origins
        callback(null, origin);
      }
    },
    credentials: true, // Allows credentials such as cookies, authorization headers, etc.
    allowedHeaders: 'Content-Type, Accept', // Specifies the headers allowed
    methods: 'GET,HEAD,OPTIONS,POST,PUT', // Specify the allowed HTTP methods
  });
  app.use(cookieParser());
  await app.listen(configure.port);
  Logger.log(`Server running on http://localhost:${configure.port}`);
}
bootstrap();