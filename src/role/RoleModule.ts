import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './model/Role';
import { BasicRole } from './model/BasicRole';
import { BasicRoleService } from './service/BasicRoleService';
import { RoleService } from './service/RoleService';
import { RoleController } from './controller/RoleController';
import { BasicRoleController } from './controller/BasicRoleController';

import { CompanyPermission } from './../permission/model/CompanyPermission';
import { Company } from 'src/company/model/Company';

@Module({
    controllers: [BasicRoleController, RoleController],
    providers: [BasicRoleService, RoleService],
    imports: [TypeOrmModule.forFeature([BasicRole, Role, Company, CompanyPermission])],
    exports: [BasicRoleService, RoleService]
})
export class RoleModule { }
