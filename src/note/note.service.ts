import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from 'src/space/entities/space.entity';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class NoteService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(Space)
    private spaceRepository: Repository<Space>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const {
      title,
      previewImageUrl,
      tags,
      description,
      isLink,
      linkContent,
      content,
      spaceId,
      userId,
    } = createNoteDto;

    const user = await this.userRepository.findOneByOrFail({
      id: userId,
    });

    const space = await this.spaceRepository.findOneByOrFail({
      id: spaceId,
    });

    const newTags: Tag[] = [];
    for (const tag of tags) {
      newTags.push(
        await this.tagRepository.save({ name: tag.trim().replace('#', '') }),
      );
    }

    const note = this.noteRepository.create({
      title,
      previewImageUrl,
      description,
      isLink,
      linkContent,
      content,
      space,
      tags: newTags,
      createdBy: user,
      editedBy: user,
    });

    return await this.noteRepository.save(note);
  }

  async findAll() {
    return await this.noteRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.noteRepository.find({
      where: { id: id },
      relations: { tags: true },
    });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const {
      title,
      previewImageUrl,
      tags,
      description,
      isLink,
      linkContent,
      content,
      userId,
    } = updateNoteDto;

    const user = await this.userRepository.findOneBy({ id: userId });

    const newTags: Tag[] = [];
    for (const tag of tags) {
      let storedTag = await this.tagRepository.findOne({
        where: { name: tag.trim().replace('#', '') },
      });
      if (!storedTag) {
        storedTag = this.tagRepository.create({
          name: tag.trim().replace('#', ''),
        });
        await this.tagRepository.save(storedTag);
      }
      newTags.push(storedTag);
    }

    const note = await this.noteRepository.findOne({
      relations: { tags: true },
      where: { id: id },
    });

    note.title = title;
    note.previewImageUrl = previewImageUrl;
    note.description = description;
    note.isLink = isLink;
    note.linkContent = linkContent;
    note.content = content;
    note.tags = newTags;
    note.editedBy = user;

    return await this.noteRepository.save(note);
  }

  remove(id: string) {
    return this.noteRepository.delete({ id: id });
  }
}
