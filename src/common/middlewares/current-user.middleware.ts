import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    const { authorization } = req.headers;
    const token = await this.jwtService.parseHeader(authorization);
    const json = this.jwtService.decodeToken(token);
    next();
  }
}
