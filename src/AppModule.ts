import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from './core/CoreModule';
import { UserModule } from './user/UserModule';

@Module({
  imports: [
    CoreModule,
    UserModule,

    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  controllers: [],
})
export class AppModule { }
