import { TokenService } from './token.service';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { TestBed } from '@automock/jest';
import { TOKEN_REPOSITORY } from '../common/constants/constants';
import { User } from '../users/entities/user.entity';
import { InternalServerException } from '../common/exceptions/internal.exception';
import { NotFoundException } from '@nestjs/common';
import { TokenNotFoundException } from '../common/exceptions/token.exception';

describe('TokenService', () => {
  let service: TokenService;
  let repo: jest.Mocked<Repository<Token>>;
  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(TokenService).compile();
    repo = unitRef.get(TOKEN_REPOSITORY);
    service = unit;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    it('should return valid token', async () => {
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockedToken: Token = {
        id: 1,
        refreshToken: '',
        user: mockedUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repo.create.mockReturnValue(mockedToken);

      const newToken = await service.create('', mockedUser);

      expect(repo.create).toHaveBeenCalled();
      expect(newToken.refreshToken).toEqual('');
      expect(newToken.user).toEqual(mockedUser);
    });
    it('should throw error when repo.create() goes wrong.', async () => {
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockedToken: Token = {
        id: 1,
        refreshToken: '',
        user: mockedUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repo.create.mockReturnValue(mockedToken);

      repo.save.mockRejectedValue('error');

      try {
        await service.create('', mockedUser);
      } catch (error) {
        expect(repo.create).toHaveBeenCalled();
        expect(repo.save).toHaveBeenCalled();
        expect(error).toEqual(new InternalServerException());
      }
    });
  });
  describe('update()', () => {
    it('should throw NotFound error when repo.findOneBy() cannot found token', async () => {
      repo.findOneBy.mockRejectedValue(new NotFoundException());
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      try {
        await service.update({ refreshToken: '' }, mockedUser);
      } catch (error) {
        expect(repo.findOneBy).toHaveBeenCalled();
        expect(error).toBeInstanceOf(TokenNotFoundException);
      }
    });
    it('should update valid token', async () => {
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockedToken: Token = {
        id: 1,
        refreshToken: '',
        user: mockedUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repo.findOneBy.mockResolvedValue(mockedToken);
      repo.save.mockResolvedValue(mockedToken);

      const updatedToken = await service.update(
        { refreshToken: '' },
        mockedUser,
      );

      expect(repo.findOneBy).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(updatedToken).toEqual(mockedToken);
    });
    it('should throw InternalServer error when repo.save() goes wrong.', async () => {
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockedToken: Token = {
        id: 1,
        refreshToken: '',
        user: mockedUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repo.findOneBy.mockResolvedValue(mockedToken);
      repo.save.mockRejectedValue('error');

      try {
        await service.update({ refreshToken: '' }, mockedUser);
      } catch (error) {
        expect(repo.findOneBy).toHaveBeenCalled();
        expect(repo.save).toHaveBeenCalled();
        expect(error).toBeInstanceOf(InternalServerException);
      }
    });
  });

  describe('delete()', () => {
    it('should delete token', async () => {
      repo.delete.mockResolvedValue({ affected: 1, raw: '' });
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await service.delete(mockedUser);
      expect(repo.delete).toHaveBeenCalled();
      expect(result).toEqual(true);
    });
    it('should throw error when repo.delete() goes wrong.', async () => {
      repo.delete.mockRejectedValue('error');
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        await service.delete(mockedUser);
      } catch (error) {
        expect(repo.delete).toHaveBeenCalled();
        expect(error).toBeInstanceOf(InternalServerException);
      }
    });
  });

  describe('findOneByUser()', () => {
    it('should throw NotFound error when repo.findOneBy() cannot found token.', async () => {
      repo.findOneBy.mockRejectedValue('error');
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        await service.findOneByUser(mockedUser);
      } catch (error) {
        expect(repo.findOneBy).toHaveBeenCalled();
        expect(error).toBeInstanceOf(TokenNotFoundException);
      }
    });
    it('should return valid token.', async () => {
      const mockedUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockedToken: Token = {
        id: 1,
        refreshToken: '',
        user: mockedUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repo.findOneBy.mockResolvedValue(mockedToken);

      const token = await service.findOneByUser(mockedUser);
      expect(repo.findOneBy).toHaveBeenCalled();
      expect(token).toEqual(mockedToken);
    });
  });
});
