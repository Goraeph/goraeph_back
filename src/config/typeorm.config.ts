import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { envKey } from './constant';

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const option = {
      type: configService.get(envKey.db.type),
      host: configService.get(envKey.db.host),
      port: configService.get(envKey.db.port),
      username: configService.get(envKey.db.username),
      password: configService.get(envKey.db.password),
      database: configService.get(envKey.db.database),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: configService.get(envKey.db.synchronize),
    };

    return option;
  },
};
