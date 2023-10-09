import { Note } from 'src/note/entities/note.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isValid: boolean;

  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}
