import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from 'src/company/model/Company';
import { CompanyService } from './service/CompanyService';
import { CompanyController } from './controller/CompanyController';

@Module({
    providers: [CompanyService],
    controllers: [CompanyController],
    imports: [TypeOrmModule.forFeature([Company])]
})
export class CompanyModule { }
