import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class PublicUserProfileDTO extends OmitType(User, [
  'password',
  'isActivated',
  'isPermissionedAdult',
]) {}
