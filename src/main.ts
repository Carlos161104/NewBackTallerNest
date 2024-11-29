import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ["http://127.0.0.1:3000", "http://localhost:3000"], // Especifica los orígenes permitidos
      credentials: true,
    }
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
     .setTitle('Ocso API')
     .setDescription('Api for ocso management')
     .setVersion('0.9')
     .addBearerAuth()
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  await app.listen(4000);
}
bootstrap();
