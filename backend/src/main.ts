import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1')

 // setup swagger
  const config = new DocumentBuilder()
    .setTitle('Service booking  API')
    .setDescription('API documentation for Service booking app')
    .setVersion('1.0')
    .addTag('service booking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(5000);
}
bootstrap();
