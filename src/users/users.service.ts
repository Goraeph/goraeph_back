import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../common/constants/constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { InternalServerException } from '../common/exceptions/internal.exception';
import {
  EmailInUseException,
  UserNotFoundException,
  UsernameInUseException,
} from '../common/exceptions/auth.exception';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private repo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.repo.find();
    } catch (e) {
      throw new InternalServerException();
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.repo.findOneByOrFail({ id });
      return user;
    } catch (e) {
      throw new UserNotFoundException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.repo.findOneByOrFail({ email });
      return user;
    } catch (e) {
      throw new UserNotFoundException();
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.repo.findOneByOrFail({ username });
      return user;
    } catch (e) {
      throw new UserNotFoundException();
    }
  }
  async validateEmailDuplicate(email: string): Promise<Error> {
    try {
      const user = await this.findByEmail(email);
      if (user !== null) {
        return new EmailInUseException();
      }
    } catch (error) {
      return null;
    }
  }

  async validateUsernameDuplicate(email: string): Promise<Error> {
    try {
      const user = await this.findByEmail(email);
      if (user !== null) {
        return new UsernameInUseException();
      }
    } catch (error) {
      return null;
    }
  }
  async create(dto: CreateUserDTO): Promise<User> {
    try {
      let err = await this.validateEmailDuplicate(dto.email);
      if (err !== null) throw err;

      err = await this.validateUsernameDuplicate(dto.email);
      if (err !== null) throw err;

      const newUser = this.repo.create(dto);
      await this.repo.save(newUser);
      return newUser;
    } catch (error) {
      if (
        !(error instanceof EmailInUseException) &&
        !(error instanceof UsernameInUseException)
      ) {
        throw new InternalServerException();
      }
      throw error;
    }
  }

  async update(dto: UpdateUserDTO): Promise<User> {
    try {
      if (dto.email !== null) {
        let err = await this.validateEmailDuplicate(dto.email);
        if (err !== null) throw err;
      }

      if (dto.username !== null) {
        let err = await this.validateUsernameDuplicate(dto.email);
        if (err !== null) throw err;
      }

      const user = await this.repo.save({ id: dto.id, ...dto });

      return user;
    } catch (error) {
      if (
        !(error instanceof EmailInUseException) &&
        !(error instanceof UsernameInUseException)
      ) {
        throw new InternalServerException();
      }
      throw error;
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const user = await this.findById(id);
      const deletedUser = await this.repo.remove(user);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
