import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entities';

export class PublicUserProfileDTO extends OmitType(User, [
  'password',
  'isActivated',
  'isPermissionedAdult',
]) {}
