import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { envKey } from './config/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>(envKey.port);

  await app.listen(port);
  console.log(`🟩 Listening on http://localhost:${port}`);
}
bootstrap();
