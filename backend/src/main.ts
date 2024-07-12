import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://pasiar-travel-logs.vercel.app/',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
