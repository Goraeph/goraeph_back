import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envKey } from './config/constant';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
