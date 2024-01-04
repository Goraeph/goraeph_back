import { Inject, Injectable } from '@nestjs/common';
import { VERIFICATION_REPOSITORY } from 'src/common/constants/constants';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(VERIFICATION_REPOSITORY) verificationRepo: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
  ) {}

  async sendVerification() {}

  async verifyVerification() {}

  async signIn() {}

  async signUp() {}
}
