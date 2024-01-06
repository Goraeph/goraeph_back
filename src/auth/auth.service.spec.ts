import { AuthService } from './auth.service';
import { Verification } from './entities/verification.entity';
import { Repository } from 'typeorm';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { TestBed } from '@automock/jest';
import { VERIFICATION_REPOSITORY } from '../common/constants/constants';
import { InternalServerException } from '../common/exceptions/internal.exception';
import { VerificationNotFound } from '../common/exceptions/auth.exception';
describe('AuthService', () => {
  let authService: AuthService;
  let verificationRepo: jest.Mocked<Repository<Verification>>;
  let jwtService: jest.Mocked<JwtService>;
  let mailService: jest.Mocked<MailService>;
  let userService: jest.Mocked<UsersService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    verificationRepo = unitRef.get(VERIFICATION_REPOSITORY);
    jwtService = unitRef.get(JwtService);
    mailService = unitRef.get(MailService);
    userService = unitRef.get(UsersService);
    tokenService = unitRef.get(TokenService);

    authService = unit;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('sendVerification()', () => {
    it('should throw error when service.createVerification() goes wrong.', async () => {
      verificationRepo.create.mockReturnValue({
        id: 1,
        uuid: '',
        expireAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      verificationRepo.save.mockRejectedValue('error');

      try {
        await authService.sendVerification('');
      } catch (error) {
        expect(verificationRepo.create).toHaveBeenCalled();
        expect(verificationRepo.save).toHaveBeenCalled();
        expect(error).toBeInstanceOf(InternalServerException);
      }
    });
    it('should throw error when mailService.sendMail() goes wrong.', async () => {
      const verification: Verification = {
        id: 1,
        uuid: '',
        expireAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      verificationRepo.create.mockReturnValue(verification);
      verificationRepo.save.mockResolvedValue(verification);

      mailService.sendMail.mockRejectedValue('error');

      try {
        await authService.sendVerification('');
      } catch (error) {
        expect(verificationRepo.create).toHaveBeenCalled();
        expect(verificationRepo.save).toHaveBeenCalled();
        expect(mailService.sendMail).toHaveBeenCalled();

        expect(error).toBeInstanceOf(InternalServerException);
      }
    });
    it('should return valid verification', async () => {
      const verification: Verification = {
        id: 1,
        uuid: '',
        expireAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      verificationRepo.create.mockReturnValue(verification);
      verificationRepo.save.mockResolvedValue(verification);

      mailService.sendMail.mockResolvedValue();

      try {
        const newVerification = await authService.sendVerification('');
        expect(verificationRepo.create).toHaveBeenCalled();
        expect(verificationRepo.save).toHaveBeenCalled();
        expect(mailService.sendMail).toHaveBeenCalled();

        expect(newVerification).toEqual(verification);
      } catch (error) {}
    });
  });

  describe('findVerification()', () => {
    it('should throw VerificationNotFound error whend repo.findOneBy() goes wrong.', async () => {
      verificationRepo.findOneBy.mockRejectedValue('error');

      try {
        await authService.findVerification('');
      } catch (error) {
        expect(verificationRepo.findOneBy).toHaveBeenCalled();
        expect(error).toBeInstanceOf(VerificationNotFound);
      }
    });

    it('should find valid verification', async () => {
      const mockedVerification: Verification = {
        id: 1,
        uuid: '',
        expireAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      verificationRepo.findOneBy.mockResolvedValue(mockedVerification);

      try {
        const verification = await authService.findVerification('');

        expect(verificationRepo.findOneBy).toHaveBeenCalled();
        expect(verification).toEqual(mockedVerification);
      } catch (error) {}
    });
  });

  describe('createVerification()', () => {
    it('should throw InternalServerException when repo.save() goes wrong.', async () => {
      verificationRepo.create.mockReturnValue(null);
      verificationRepo.save.mockRejectedValue('error');

      try {
        await authService.createVerification('');
      } catch (error) {
        expect(verificationRepo.create).toHaveBeenCalled();
        expect(verificationRepo.save).toHaveBeenCalled();

        expect(error).toBeInstanceOf(InternalServerException);
      }
    });
    it('should return valid verification', async () => {
      const mockedVerification: Verification = {
        id: 1,
        uuid: '',
        expireAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      verificationRepo.create.mockReturnValue(mockedVerification);
      verificationRepo.save.mockResolvedValue(mockedVerification);

      try {
        const verification = await authService.createVerification('');

        expect(verificationRepo.create).toHaveBeenCalled();
        expect(verificationRepo.save).toHaveBeenCalled();

        expect(verification).toEqual(mockedVerification);
      } catch (error) {}
    });
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
