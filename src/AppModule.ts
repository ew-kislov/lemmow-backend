import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/DatabaseModule';
import { CoreModule } from './core/CoreModule';
import { UserModule } from './user/UserModule';
import { CompanyModule } from './company/CompanyModule';
import { RoleModule } from './role/RoleModule';
import { PermissionModule } from './permission/PermissionModule';
import { AuthModule } from './auth/AuthModule';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.dev' }),
    DatabaseModule,
    CoreModule,
    UserModule,
    AuthModule,
    CompanyModule,
    RoleModule,
    PermissionModule
  ]
})
export class AppModule { }
