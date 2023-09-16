import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envKey } from './config/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
