import { Injectable, ExecutionContext, UnauthorizedException, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['token-Uok-PMS'];

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            console.log(decoded);

            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
