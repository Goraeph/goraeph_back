import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColorTheme } from '../types/colorTheme';

@Entity()
export class Space {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // TODO: [kangmin] Column에서도 nullable 하게, ?를 붙여서 undefined를 허용. 둘 다 해야하는 거 맞나?
  @Column({ type: 'json', nullable: true })
  colorTheme?: ColorTheme;

  @ManyToOne(() => User, (user) => user.maps)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  owner: User;
}
