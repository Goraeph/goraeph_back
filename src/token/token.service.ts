import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKEN_REPOSITORY } from '../common/constants/constants';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { User } from '../users/entities/user.entity';
import { UpdateTokenDTO } from './dtos/update-token.dto';
import { InternalServerException } from '../common/exceptions/internal.exception';
import { TokenNotFoundException } from '../common/exceptions/token.exception';

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

      const updatedToken = await this.tokenRepo.save(token);
      return updatedToken;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerException();
      }
      throw new TokenNotFoundException();
    }
  }

  async delete(user: User) {
    try {
      await this.tokenRepo.delete({ user });

      return true;
    } catch (error) {
      throw new InternalServerException();
    }
  }

  async findOneByUser(user: User) {
    try {
      const token = await this.tokenRepo.findOneBy({ user });
      return token;
    } catch (error) {
      throw new TokenNotFoundException();
    }
  }
}
