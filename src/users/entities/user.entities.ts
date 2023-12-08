import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MinLength } from 'class-validator';
import { Common } from 'src/common/entities/common.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends Common {
  @Column({ unique: true })
  @Expose()
  @ApiProperty()
  nickname: string;

  @Column({ unique: true })
  @Expose()
  @ApiProperty()
  email: string;

  @Column({ default: true })
  @Expose()
  @ApiProperty()
  isActivated: boolean;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty()
  profileImg?: string;

  @Column({ nullable: true })
  @ApiProperty()
  birthDate?: Date;

  @Column({ default: false })
  @ApiProperty()
  isPermissionedAdult: boolean;

  @Column()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
