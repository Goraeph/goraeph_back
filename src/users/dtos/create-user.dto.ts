import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDTO extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
