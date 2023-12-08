import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { databaseProviders } from './database/database.providers';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'prod' ? '.env.prod' : '.env.dev',
      validationSchema: joi.object({
        DATABASE_HOST: joi.string().required(),
        DATABASE_PORT: joi.string().required(),
        DATABASE_USERNAME: joi.string().required(),
        DATABASE_PASSWORD: joi.string().required(),
        DATABASE_NAME: joi.string().required(),
      }),
    }),
    CommonModule,
  ],
  controllers: [],
  providers: [...databaseProviders],
})
export class AppModule {}
