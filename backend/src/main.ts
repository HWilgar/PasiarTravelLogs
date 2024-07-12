import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsMiddleware } from './middleware/CorsMiddleware';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(new CorsMiddleware().use);

  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
