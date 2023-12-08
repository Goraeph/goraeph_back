import { Inject, Injectable } from '@nestjs/common';
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
      const user = await this.repo.findOneBy({ id });
      return user;
    } catch (e) {
      throw new UserNotFoundException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.repo.findOneBy({ email });
      return user;
    } catch (e) {
      throw new UserNotFoundException();
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.repo.findOneBy({ username });
      return user;
    } catch (e) {
      throw new UserNotFoundException();
    }
  }
  async validateEmailDuplicate(email: string): Promise<Error> {
    const user = await this.findByEmail(email);
    if (user !== null) {
      return new EmailInUseException();
    }
    return null;
  }

  async validateUsernameDuplicate(email: string): Promise<Error> {
    const user = await this.findByEmail(email);
    if (user !== null) {
      return new UsernameInUseException();
    }
    return null;
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
      throw error;
    }
  }

  async update(dto: UpdateUserDTO): Promise<User> {
    try {
      let err = await this.validateEmailDuplicate(dto.email);
      if (err !== null) throw err;

      err = await this.validateUsernameDuplicate(dto.email);
      if (err !== null) throw err;

      const user = await this.repo.save({ id: dto.id, ...dto });

      return user;
    } catch (error) {
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
