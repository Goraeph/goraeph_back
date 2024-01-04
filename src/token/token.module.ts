import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { tokenProvider } from './token.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [TokenService, ...tokenProvider],
  exports: [TokenModule],
  imports: [DatabaseModule],
})
export class TokenModule {}
