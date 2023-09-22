import { Space } from 'src/space/entities/space.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ default: true, comment: '활성화 계정 여부' })
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  name: string;

  @Column({ nullable: true, comment: '프로필 이미지 사진 저장 경로' })
  profileImageUrl: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ default: false, comment: '성인 여부' })
  isAdult: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Space, (space) => space.owner)
  maps: Space[];
}
