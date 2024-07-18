import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

async function bootstrap() {
  dotenv.config();
  const adapter = new ExpressAdapter();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );
  app.setGlobalPrefix('api/v1');
  // app.enableCors();
  app.use(helmet());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
