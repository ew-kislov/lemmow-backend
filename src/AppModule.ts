import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/DatabaseModule';
import { CoreModule } from './core/CoreModule';
import { UserModule } from './user/UserModule';
import { CompanyModule } from './company/CompanyModule';
import { RoleModule } from './role/RoleModule';
import { PermissionModule } from './permission/PermissionModule';

@Module({
  imports: [
    DatabaseModule,
    CoreModule,
    UserModule,
    CompanyModule,
    RoleModule,
    PermissionModule
  ]
})
export class AppModule { }
