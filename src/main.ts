import * as dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';
import { TransformInterceptor } from './core/interceptor/TransformInterceptor';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.listen(process.env.APP_PORT);
}

bootstrap();