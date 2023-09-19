import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // 활동 사용자 여부
  @Column({ default: true })
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  name: string;

  // 프로필 이미지 사진 저장 경로
  @Column()
  profileImageUrl: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  // 사용자의 성인 여부
  @Column({ default: false })
  isAdult: boolean;
}
