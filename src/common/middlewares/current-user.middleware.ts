import { Injectable, NestMiddleware } from '@nestjs/common';
import { IJWTDecode } from 'src/jwt/jwt.interface';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    const { authorization } = req.headers;
    if (authorization) {
      const token = await this.jwtService.parseHeader(authorization);
      try {
        await this.jwtService.verify(token);
        const { id } = (await this.jwtService.decodeToken(
          token,
        )) as unknown as IJWTDecode;
        const user = await this.userService.findById(id);
        req.user = user;
      } catch (error) {
        throw error;
      }
    }
    next();
  }
}
