import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Goraeph Backend API')
    .setDescription('Blog Service Goraeph API Description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
  console.log(`🟩 Listening on http://localhost:${port}`);
}
bootstrap();
