import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Proveedores API MID')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
