import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { USER_REPOSITORY } from 'src/common/constants/constants';
@Module({
  imports: [DatabaseModule],
  exports: [UsersModule, USER_REPOSITORY],
  providers: [UsersService, ...userProviders],

  controllers: [UsersController],
})
export class UsersModule {}
