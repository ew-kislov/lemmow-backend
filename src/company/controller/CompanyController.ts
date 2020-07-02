import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Body,
    Put
} from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';
import { ValidationPipe } from '../../core/pipe/ValidationPipe';

import { Company } from 'src/company/model/Company';
import { CompanyService } from './../service/CompanyService';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { UpdateCompanyDto } from '../dto/UpdateCompanyDto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService, private readonly loggerService: LoggerService) { }

    @Get(':id')
    public async getCompany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
        this.loggerService.log(`GET /companies/${id}`, 'CompanyController');

        return this.companyService.getCompany(id);
    }

    @Post()
    public async createCompany(@Body(new ValidationPipe()) companyDto: CreateCompanyDto): Promise<Company> {
        this.loggerService.log('POST /companies', 'CompanyController');

        return this.companyService.addCompany(companyDto);
    }

    @Put()
    public async updateCompany(@Body(new ValidationPipe()) companyDto: UpdateCompanyDto)  {
        this.loggerService.log('PUT /companies', 'updateCompany');

        return this.companyService.updateCompany(companyDto);
    }
}