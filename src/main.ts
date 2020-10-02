import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';
import { TransformInterceptor } from './core/interceptor/TransformInterceptor';
import { ConfigService } from '@nestjs/config';
import { ExceptionFormatter } from './core/exception-filter/ExceptionFormatter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExceptionFormatter());

  app.listen(configService.get('APP_PORT'));
}

bootstrap();