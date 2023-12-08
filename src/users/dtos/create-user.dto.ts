import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entities';

export class CreateUserDTO extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
