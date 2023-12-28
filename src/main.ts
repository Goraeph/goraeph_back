import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filter/exception.filter';
async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .addServer('api/v1')
    .setTitle('Goraeph Backend API')
    .setDescription('Blog Service Goraeph API Description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(port);
  console.log(`🟩 Listening on http://localhost:${port}`);
}
bootstrap();
