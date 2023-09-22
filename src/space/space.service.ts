import { Injectable } from '@nestjs/common';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SpaceService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Space)
    private spaceRepository: Repository<Space>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createSpaceDto: CreateSpaceDto) {
    const { name, description, ownerID } = createSpaceDto;

    const user = await this.userRepository.findOneBy({ id: ownerID });
    const space = this.spaceRepository.create({
      name,
      description,
    });
    space.owner = user;

    await this.spaceRepository.save(space);

    return;
  }

  findAll() {
    return `This action returns all space`;
  }

  findOne(id: number) {
    return `This action returns a #${id} space`;
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space, ${updateSpaceDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} space`;
  }
}
