import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  nickname: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ default: false })
  isAdult: boolean;
}
