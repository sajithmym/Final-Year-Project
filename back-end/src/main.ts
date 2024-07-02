import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configure } from 'config';
import * as cookieParser from 'cookie-parser';

// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { JwtService } from '@nestjs/jwt'; // Add this line
// import { request } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:2222',
    credentials: true,
  });

  // Correctly instantiate JwtAuthGuard with JwtService
  // const jwtService = app.get(JwtService);
  // app.useGlobalGuards(new JwtAuthGuard(jwtService));


  await app.listen(configure.port);

  Logger.log(`Server running on http://localhost:${configure.port}`);
}
bootstrap();