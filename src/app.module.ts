import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envKey } from './config/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { SpaceModule } from './space/space.module';
import { TagModule } from './tag/tag.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `env/${
        ['prod', 'dev', 'loc', 'test'].findIndex(
          (v) => v === process.env[envKey.nodeEnv],
        ) !== -1
          ? process.env[envKey.nodeEnv]
          : 'dev'
      }.env`,
    }),
    TypeOrmModule.forRootAsync(typeORMConfig),
    UserModule,
    SpaceModule,
    TagModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
