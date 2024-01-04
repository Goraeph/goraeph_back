import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Common } from '../../common/entities/common.entities';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Token extends Common {
  @Column({ unique: true })
  @IsString()
  @ApiProperty()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.token)
  user: User;
}
