import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { UsersModule } from 'src/users/users.module';
import { verficiationProviders } from './verifications.providers';
import { DatabaseModule } from 'src/database/database.module';
import { TokenService } from 'src/token/token.service';

@Module({
  providers: [
    AuthService,
    JwtService,
    MailService,
    TokenService,
    ...verficiationProviders,
  ],
  imports: [UsersModule, DatabaseModule],
  controllers: [AuthController],
})
export class AuthModule {}
