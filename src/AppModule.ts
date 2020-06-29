import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/DatabaseModule';
import { CoreModule } from './core/CoreModule';
import { UserModule } from './user/UserModule';
import { CompanyModule } from './company/CompanyModule';

@Module({
  imports: [
    DatabaseModule,
    CoreModule,
    UserModule,
    CompanyModule
  ],
  controllers: [],
})
export class AppModule { }
