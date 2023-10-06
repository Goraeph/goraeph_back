import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const { name } = createTagDto;

    const tag = this.tagRepository.create({ name: name });

    await this.tagRepository.save(tag);

    return;
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findByName(name: string) {
    return await this.tagRepository.findOneBy({ name });
  }
}
