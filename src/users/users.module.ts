import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { USER_REPOSITORY } from 'src/common/constants/constants';
import { MailModule } from 'src/mail/mail.module';
@Module({
  imports: [DatabaseModule, MailModule],
  exports: [UsersModule, USER_REPOSITORY, UsersService],
  providers: [UsersService, ...userProviders],

  controllers: [UsersController],
})
export class UsersModule {}
