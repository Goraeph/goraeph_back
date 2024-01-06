import { Inject, Injectable } from '@nestjs/common';
import { VERIFICATION_REPOSITORY } from '../common/constants/constants';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';
import { InternalServerException } from '../common/exceptions/internal.exception';
import { v4 as uuidv4 } from 'uuid';
import {
  VerificationExpired,
  VerificationNotFound,
} from '../common/exceptions/auth.exception';
import { CreateUserDTO } from '../users/dtos/create-user.dto';
import { SigninDTO } from './dtos/signin.dto';
import { SigninOutputDTO } from './dtos/signin-output.dto';
import { JWTExpireTimeEnum } from '../common/enums/jwt-expire-time.enum';
import { TokenService } from '../token/token.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject(VERIFICATION_REPOSITORY)
    private verificationRepo: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async sendVerification(email: string): Promise<Verification> {
    try {
      const newUUID = uuidv4();
      const newVerification = await this.createVerification(newUUID);
      await this.mailService.sendMail(email, newUUID);
      return newVerification;
    } catch (error) {
      throw new InternalServerException();
    }
  }
  async findVerification(code: string) {
    try {
      const verification = await this.verificationRepo.findOneBy({
        uuid: code,
      });
      return verification;
    } catch (error) {
      throw new VerificationNotFound();
    }
  }

  async createVerification(code: string) {
    try {
      const newVerification = this.verificationRepo.create({ uuid: code });

      await this.verificationRepo.save(newVerification);
      return newVerification;
    } catch (error) {
      throw new InternalServerException();
    }
  }

  timeDifferenceInMinutes(dateA: Date, dateB: Date) {
    const timeDifferenceInMills = dateA.getTime() - dateB.getTime();

    const minutes = timeDifferenceInMills / (1000 * 60);

    return minutes;
  }

  async verifyVerification(code: string) {
    try {
      const verification = await this.findVerification(code);

      const timeDifference = this.timeDifferenceInMinutes(
        verification.expireAt,
        new Date(Date.now()),
      );

      if (timeDifference > 3) {
        throw new VerificationExpired();
      }

      return true;
    } catch (error) {
      throw new InternalServerException();
    }
  }

  async signIn(dto: SigninDTO): Promise<SigninOutputDTO> {
    try {
      const user = await this.userService.findByEmail(dto.email);

      const accessToken = await this.jwtService.createToken(
        user.id,
        JWTExpireTimeEnum.ACCESS_TOKEN_EXPIRY_TIME,
      );
      const refreshToken = await this.jwtService.createToken(
        user.id,
        JWTExpireTimeEnum.REFRESH_TOKEN_EXPIRY_TIME,
      );

      await this.tokenService.create(refreshToken, user);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async signUp(dto: CreateUserDTO) {
    try {
      const newUser = await this.userService.create(dto);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
