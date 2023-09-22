import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColorTheme } from '../types/colorTheme';

@Entity()
export class Space {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'json' })
  colorTheme: ColorTheme;

  @ManyToOne(() => User, (user) => user.maps)
  owner: User;
}
