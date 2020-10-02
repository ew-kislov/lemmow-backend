import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from 'src/company/model/Company';
import { CompanyService } from './service/CompanyService';
import { CompanyController } from './controller/CompanyController';

import { UserModule } from './../user/UserModule';
import { RoleModule } from './../role/RoleModule';
import { Role } from 'src/role/model/Role';
import { User } from 'src/user/model/User';

@Module({
    providers: [CompanyService],
    controllers: [CompanyController],
    imports: [TypeOrmModule.forFeature([Company, Role, User]), RoleModule, UserModule]
})
export class CompanyModule { }
