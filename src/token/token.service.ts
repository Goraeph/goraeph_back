import { Inject, Injectable } from '@nestjs/common';
import { TOKEN_REPOSITORY } from '../common/constants/constants';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { User } from '../users/entities/user.entity';
import { UpdateTokenDTO } from './dtos/update-token.dto';
import { InternalServerException } from '../common/exceptions/internal.exception';

@Injectable()
export class TokenService {
  constructor(@Inject(TOKEN_REPOSITORY) private tokenRepo: Repository<Token>) {}
  async create(token: string, user: User): Promise<Token> {
    try {
      const newToken = this.tokenRepo.create({ refreshToken: token, user });
      await this.tokenRepo.save(newToken);
      return newToken;
    } catch (error) {
      throw new InternalServerException();
    }
  }

  async update(dto: UpdateTokenDTO, user: User) {
    try {
      const token = await this.tokenRepo.findOneBy({ user });
      Object.assign(token, dto);

      await this.tokenRepo.save(token);
      return token;
    } catch (error) {
      throw new InternalServerException();
    }
  }

  async delete(user: User) {
    try {
      const deletedToken = await this.tokenRepo.delete({ user });

      return deletedToken;
    } catch (error) {
      throw new InternalServerException();
    }
  }

  async findOneByUser(user: User) {
    try {
      const token = await this.tokenRepo.findOneBy({ user });
      return token;
    } catch (error) {
      throw error;
    }
  }
}
