import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Space } from 'src/space/entities/space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, User, Space, Tag])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
