import { Module } from '@nestjs/common';

import { CoreModule } from './core/CoreModule';
import { UserModule } from './user/UserModule';
import { DatabaseModule } from './database/DatabaseModule';

@Module({
  imports: [
    DatabaseModule,
    CoreModule,
    UserModule
  ],
  controllers: [],
})
export class AppModule { }
