import { PartialType } from '@nestjs/swagger';
import { Token } from '../entities/token.entity';

export class UpdateTokenDTO extends PartialType(Token) {}
