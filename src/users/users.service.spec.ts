import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { TestBed } from '@automock/jest';
import { USER_REPOSITORY } from '../common/constants/constants';
import { InternalServerException } from '../common/exceptions/internal.exception';
import {
  EmailInUseException,
  UserNotFoundException,
  UsernameInUseException,
} from '../common/exceptions/auth.exception';

describe('UserService Unit Test', () => {
  let userService: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UsersService).compile();
    repo = unitRef.get(USER_REPOSITORY);
    userService = unit;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('findAll()', () => {
    it('should occur error when find() goes wrong', async () => {
      repo.find.mockRejectedValue('error');
      try {
        const _ = await userService.findAll();
      } catch (e) {
        expect(repo.find).toHaveBeenCalled();
        expect(e).toStrictEqual(new InternalServerException());
      }
    });

    it('should retrive user from repo', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          username: '1',
          email: '1@a.com',
          password: '1',
          isActivated: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: '1',
          email: '1@a.com',
          password: '1',
          isActivated: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      repo.find.mockResolvedValue(mockUsers);

      const users = await userService.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('findById()', () => {
    it('should occur error when findOneBy() goes wrong.', async () => {
      repo.findOneByOrFail.mockRejectedValue('error');
      try {
        const _ = await userService.findById(1);
      } catch (e) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(e).toStrictEqual(new UserNotFoundException());
      }
    });

    it('should retrieve user from repo', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);

      const users = await userService.findById(1);

      expect(repo.find).toHaveBeenCalled();
      expect(users).toEqual(mockUser);
    });
  });

  describe('findByEmail()', () => {
    it('should occur error when findOneBy() goes wrong.', async () => {
      repo.findOneByOrFail.mockRejectedValue('error');
      try {
        const _ = await userService.findByEmail('');
      } catch (e) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(e).toStrictEqual(new UserNotFoundException());
      }
    });

    it('should retrieve user from repo', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);

      const users = await userService.findByEmail('');

      expect(repo.find).toHaveBeenCalled();
      expect(users).toEqual(mockUser);
    });
  });
  describe('validateEmailDuplicate()', () => {
    it('should return error when find user', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);
      try {
        await userService.validateEmailDuplicate('');
      } catch (err) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(err).toStrictEqual(new EmailInUseException());
      }
    });

    it('should return null when cannot find user', async () => {
      repo.findOneByOrFail.mockRejectedValue('error');

      const err = await userService.validateEmailDuplicate('');

      expect(repo.findOneByOrFail).toHaveBeenCalled();
      expect(err).toEqual(null);
    });
  });
  describe('validateUsernameDuplicate()', () => {
    it('should return valid error when find user', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);
      try {
        const err = await userService.validateUsernameDuplicate('');
      } catch (err) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(err).toStrictEqual(new UsernameInUseException());
      }
    });
    it('should return null when cannot find user', async () => {
      repo.findOneByOrFail.mockRejectedValue('error');

      const err = await userService.validateUsernameDuplicate('');

      expect(repo.findOneByOrFail).toHaveBeenCalled();
      expect(err).toEqual(null);
    });
  });
  describe('create()', () => {
    it('should occur error when save() goes wrong.', async () => {
      repo.save.mockRejectedValue('error');
      try {
        const err = await userService.create({
          username: '',
          email: '',
          password: '',
          isActivated: true,
        });
      } catch (error) {
        expect(repo.create).toHaveBeenCalled();
        expect(repo.save).toHaveBeenCalled();
        expect(error).toEqual(new InternalServerException());
      }
    });
    it('should validate duplicate username', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);
      try {
        const result = await userService.create({
          username: '1',
          email: '',
          password: '',
          isActivated: true,
        });
      } catch (error) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should validate duplicate email', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);
      try {
        const result = await userService.create({
          username: '',
          email: '1@a.com',
          password: '',
          isActivated: true,
        });
      } catch (error) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should create user from repo', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(null);
      repo.create.mockReturnValue(mockUser);
      repo.save.mockResolvedValue(mockUser);
      try {
        const newUser = await userService.create({
          username: '',
          email: '',
          password: '',
          isActivated: true,
        });
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(repo.create).toHaveBeenCalled();
        expect(repo.save).toHaveBeenCalled();
        expect(newUser).toEqual(mockUser);
      } catch (error) {}
    });
  });

  describe('update()', () => {
    it('should occur error when findById() goes wrong.', async () => {
      repo.findOneByOrFail.mockRejectedValue('error');
      try {
        const _ = await userService.update(1, { username: '' });
      } catch (error) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should validate duplicate username', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);
      try {
        const result = await userService.update(1, { username: '1' });
      } catch (error) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should validate duplicate email', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);
      try {
        const result = await userService.update(1, {
          email: '1@a.com',
        });
      } catch (error) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should update user from repo', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);

      const updatedMockUser = mockUser;

      updatedMockUser.username = 'test';
      repo.save.mockResolvedValue(updatedMockUser);

      const updatedUser = await userService.update(1, { username: 'test' });

      expect(updatedUser.username).toEqual('test');
    });
  });

  describe('delete()', () => {
    it("should occur error when can't find user ", async () => {
      repo.findOneByOrFail.mockResolvedValue(null);

      try {
        const user = await userService.delete(1);
      } catch (error) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should occur error when remove() goes wrong', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);
      repo.remove.mockRejectedValue('error');
      try {
        const user = await userService.delete(1);
      } catch (error) {
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(repo.remove).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should delete user from repo', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneByOrFail.mockResolvedValue(mockUser);
      repo.remove.mockResolvedValue(mockUser);
      try {
        const user = await userService.delete(1);
        expect(user).toEqual(mockUser);
        expect(repo.findOneByOrFail).toHaveBeenCalled();
        expect(repo.remove).toHaveBeenCalled();
      } catch (error) {}
    });
  });
});
