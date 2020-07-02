import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CompanyPermission } from './model/CompanyPermission';
import { CompanyPermissionService } from './service/CompanyPermissionService';
import { CompanyPermissionController } from './controller/CompanyPermissionController';

@Module({
    controllers: [CompanyPermissionController],
    providers: [CompanyPermissionService],
    imports: [TypeOrmModule.forFeature([CompanyPermission])]
})
export class PermissionModule { }
