import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
import { Common } from 'src/common/entities/common.entities';
import { Column, Entity } from 'typeorm';

function getMinute(minute: number) {
  return minute * 60 * 1000;
}
@Entity()
export class Verification extends Common {
  @Column({ unique: true })
  @IsString()
  @ApiProperty()
  uuid: string;

  @Column({ default: new Date(Date.now() + getMinute(3)) })
  @IsDateString()
  @ApiProperty()
  expireAt: Date;
}
