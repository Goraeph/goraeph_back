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

    return space;
  }

  async findAll(userId: number): Promise<Space[]> {
    const spaceList = await this.spaceRepository.find({
      where: { userId: userId },
    });

    return spaceList;
  }

  async findOne(id: string): Promise<Space> {
    return await this.spaceRepository.findOneBy({ id });
  }

  async update(id: string, updateSpaceDto: UpdateSpaceDto) {
    return await this.spaceRepository.update({ id }, updateSpaceDto);
  }

  async remove(id: string) {
    return await this.spaceRepository.delete({ id });
  }
}
