export class UpdateUserDto {
  readonly password?: string;
  readonly nickname?: string;
  readonly profileImageUrl?: string;
  readonly birthDate?: Date;
}
