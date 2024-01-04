import { TokenService } from './token.service';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { TestBed } from '@automock/jest';
import { TOKEN_REPOSITORY } from '../common/constants/constants';
import { User } from '../users/entities/user.entity';
import { InternalServerException } from '../common/exceptions/internal.exception';

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
    it.todo('should update valid token');
    it.todo(
      'should throw NotFound error when repo.findOneBy() cannot found token.',
    );
    it.todo('should throw InternalServer error when repo.save() goes wrong.');
  });

  describe('delete()', () => {
    it.todo('should delete token');
    it.todo('should throw error when repo.delete() goes wrong.');
  });

  describe('findOneByUser()', () => {
    it.todo(
      'should throw NotFound error when repo.findOneBy() cannot found token.',
    );
    it.todo('should return valid token.');
  });
});
