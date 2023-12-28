import { TestBed } from '@automock/jest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entities';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

describe('UserController Unit Test', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UsersController).compile();
    service = unitRef.get(UsersService);
    controller = unit;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('viewAllUsers()', () => {
    it('should return users', async () => {
      service.findAll.mockResolvedValue([]);
      const users = await controller.viewAllUsers();
      expect(users).toEqual([]);
    });
    it('should failed when service.findAll() throw error', async () => {
      service.findAll.mockRejectedValue('error');
      try {
        const users = await controller.viewAllUsers();
        expect(users).toEqual([]);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual('error');
        expect(service.findAll).toHaveBeenCalled();
      }
    });
  });

  describe('viewPublicUserProfile()', () => {
    it('should return users profile', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.findById.mockResolvedValue(mockUser);
      const user = await controller.viewPublicUserProfile(1);
      expect(user).toBeDefined();
      expect(user).toEqual(mockUser);
    });
    it('should failed when service.findById() throw error ', async () => {
      service.findById.mockRejectedValue('error');
      try {
        const user = await controller.viewPublicUserProfile(1);
      } catch (error) {
        expect(service.findById).toHaveBeenCalled();
        expect(error).toBeDefined();
        expect(error).toEqual('error');
      }
    });
  });

  describe('createUser()', () => {
    it('should create / return user', async () => {
      const mockInput: CreateUserDTO = {
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
      };

      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.create.mockResolvedValue(mockUser);
      const user = await controller.createUser(mockUser);
      expect(user).toBeDefined();
      expect(user).toEqual(mockUser);
    });
    it('should failed when service.findById() throws error ', async () => {
      service.findById.mockRejectedValue('error');
      try {
        const user = await controller.viewPublicUserProfile(1);
      } catch (error) {
        expect(service.findById).toHaveBeenCalled();
        expect(error).toBeDefined();
        expect(error).toEqual('error');
      }
    });
  });

  describe('updateUser()', () => {
    it('should return user', async () => {
      const mockInput: UpdateUserDTO = {
        username: '1',
      };

      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.update.mockResolvedValue(mockUser);
      const user = await controller.updateUser(1, mockInput);
      expect(user).toBeDefined();
      expect(user).toEqual(mockUser);
    });
    it('should failed when service.update() throws error', async () => {
      const mockInput: UpdateUserDTO = {
        username: '1',
      };

      service.update.mockRejectedValue('error');
      try {
        const user = await controller.updateUser(1, mockInput);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual('error');
      }
    });
  });

  describe('deleteUser()', () => {
    it('should delete / return user', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.delete.mockResolvedValue(mockUser);
      const user = await controller.deleteUser(1);
      expect(user).toBeDefined();
      expect(user).toEqual(mockUser);
    });
    it('should failed when service.delete() throws error', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.delete.mockRejectedValue('error');
      try {
        const user = await controller.deleteUser(1);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual('error');
      }
    });
  });
});
