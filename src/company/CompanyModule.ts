import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from 'src/company/model/Company';
import { CompanyService } from './service/CompanyService';
import { CompanyController } from './controller/CompanyController';

import { UserModule } from './../user/UserModule';
import { RoleModule } from './../role/RoleModule';

@Module({
    providers: [CompanyService],
    controllers: [CompanyController],
    imports: [TypeOrmModule.forFeature([Company]), RoleModule, UserModule]
})
export class CompanyModule { }
