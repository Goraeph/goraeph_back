import { AuthService } from './auth.service';
import { Verification } from './entities/verification.entity';
import { Repository } from 'typeorm';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { TestBed } from '@automock/jest';
import { VERIFICATION_REPOSITORY } from '../common/constants/constants';
describe('AuthService', () => {
  let authService: AuthService;
  let verificationRepo: jest.Mocked<Repository<Verification>>;
  let jwtService: jest.Mocked<JwtService>;
  let mailService: jest.Mocked<MailService>;
  let userService: jest.Mocked<UsersService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    const verificationRepo = unitRef.get(VERIFICATION_REPOSITORY);
    const jwtService = unitRef.get(JwtService);
    const mailService = unitRef.get(MailService);
    const userService = unitRef.get(UsersService);
    const tokenService = unitRef.get(TokenService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('sendVerification()', () => {
    it.todo('should throw error when service.createVerification() goes wrong.');
    it.todo('should throw error when mailService.sendMail() goes wrong.');
    it.todo('should return valid verification');
  });

  describe('findVerification()', () => {
    it.todo(
      'should throw VerificationNotFound error whend repo.findOneBy() goes wrong.',
    );

    it.todo('should find valid verification');
  });

  describe('createVerification()', () => {
    it.todo(
      'should throw InternalServerException when repo.create() goes wrong.',
    );
    it.todo('should return valid verification');
  });

  describe('timeDifferenceInMinutes()', () => {
    it.todo('should calculate valid time difference.');
  });

  describe('verifyVerification()', () => {
    it.todo(
      'should throw error when service.findVerification() throw not found exception.',
    );
    it.todo(
      'should throw VerificationExpired Error when timeDifference is less then 3 minutes.',
    );
    it.todo('should return true when valid verification was found.');
  });

  describe('signIn()', () => {
    it.todo('should throw error when usersService.findByEmail() throws error.');
    it.todo('should throw error when jwtService.createToken() throws error.');
    it.todo('should throw error when jwtService.create() throws error.');
    it.todo('should return valid access/refresh token');
  });

  describe('signUp()', () => {
    it.todo('should throw error when usersService.create() throws error.');
    it.todo('should return new user.');
  });
});
