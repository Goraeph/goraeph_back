import { IsString } from 'class-validator';

export class SigninOutputDTO {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
