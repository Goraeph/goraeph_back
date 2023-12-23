import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Common {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Expose()
  id: number;

  @CreateDateColumn()
  @ApiProperty()
  @Expose()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
