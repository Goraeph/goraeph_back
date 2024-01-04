import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';
import { Common } from '../../common/entities/common.entities';
import { Column, Entity, OneToOne } from 'typeorm';
import { Token } from '../../token/entities/token.entity';

@Entity()
export class User extends Common {
  @Column({ unique: true })
  @Expose()
  @IsString()
  @ApiProperty()
  username: string;

  @Column({ unique: true })
  @Expose()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column({ default: true })
  @Expose()
  @IsBoolean()
  @ApiProperty()
  isActivated: boolean;

  @Column({ nullable: true })
  @Expose()
  @IsString()
  @ApiProperty()
  profileImg?: string;

  @Column({ nullable: true })
  @IsDateString()
  @ApiProperty()
  birthDate?: Date;

  @Column({ default: false })
  @IsBoolean()
  @ApiProperty()
  isPermissionedAdult?: boolean;

  @Column()
  @MinLength(8)
  @IsString()
  @ApiProperty()
  password: string;

  @OneToOne(() => Token, (token) => token.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  token?: Token;
}
