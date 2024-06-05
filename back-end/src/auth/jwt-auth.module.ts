import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configure } from 'config';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: configure.JWTsecret,
            signOptions: { expiresIn: 'id' },  // adjust as needed
        }),
    ],
    providers: [JwtStrategy],
    exports: [JwtModule],
})
export class JwtAuthModule { }