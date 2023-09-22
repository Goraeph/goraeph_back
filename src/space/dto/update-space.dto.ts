import { PartialType } from '@nestjs/mapped-types';
import { CreateSpaceDto } from './create-space.dto';
import { ColorTheme } from '../types/colorTheme';

export class UpdateSpaceDto extends PartialType(CreateSpaceDto) {
  colorTheme?: ColorTheme;
}
