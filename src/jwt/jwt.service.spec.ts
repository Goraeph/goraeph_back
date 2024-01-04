import { JwtService } from './jwt.service';
import { JwtOptions } from './jwt.options.interface';
import { TestBed } from '@automock/jest';
import { JWT_OPTIONS } from '../common/constants/constants';
import { JwtVerifyFailedException } from '../common/exceptions/jwt.exception';
import { JWTExpireTimeEnum } from '../common/enums/jwt-expire-time.enum';
import * as jwt from 'jsonwebtoken';
describe('JwtService', () => {
  let service: JwtService;
  let options: jest.Mocked<JwtOptions>;
  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(JwtService).compile();
    options = unitRef.get(JWT_OPTIONS);
    service = unit;

    options.secretKey = 'asjlkdjnaslkdjsl';
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('verify()', () => {
    it('should failed when given token is not valid', async () => {
      try {
        await service.verify('asdasd');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual(new JwtVerifyFailedException());
      }
    });

    it('should return true when given token is valid', async () => {
      try {
        const token = jwt.sign({ id: 1 }, options.secretKey);
        const result = await service.verify(token);
        expect(result).toBeDefined();
        expect(result).toEqual(true);
      } catch (error) {}
    });
  });

  describe('createToken()', () => {
    it('should create token', async () => {
      try {
        const token = await service.createToken(
          1,
          JWTExpireTimeEnum.ACCESS_TOKEN_EXPIRY_TIME,
        );
        expect(token).toBeDefined();
        const result = await service.verify(token);
        expect(result).toEqual(true);
      } catch (error) {}
    });
  });

  describe('parseHeader()', () => {
    it('should parse header', async () => {
      const header = 'Authorization : Bearer sometoken';
      const token = await service.parseHeader(header);
      expect(token).toEqual('sometoken');
    });
  });
});
