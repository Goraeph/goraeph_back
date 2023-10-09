import { Space } from 'src/space/entities/space.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  previewImageUrl: string;

  @Column()
  description: string;

  @Column({ default: false })
  isLink: boolean;

  @Column()
  linkContent: string;

  @Column()
  content: string;

  @ManyToOne(() => Space, (space) => space.notes)
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  space: Space;

  @ManyToOne(() => User, (user) => user.createdNotes)
  @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.editedNotes)
  @JoinColumn({ name: 'editedBy', referencedColumnName: 'id' })
  editedBy: User;

  @ManyToMany(() => Tag, (tag) => tag.notes)
  @JoinTable({ name: 'note_tag_bridge' })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastEditedAt: Date;
}
