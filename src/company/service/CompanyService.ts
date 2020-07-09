import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityNotFoundByIdException } from './../../core/exception/EntityNotFoundException';

import { Repository, UpdateResult } from 'typeorm';

import { LoggerService } from '../../core/service/LoggerService';

import { Company } from 'src/company/model/Company';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { UpdateCompanyDto } from '../dto/UpdateCompanyDto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        private readonly loggerService: LoggerService
    ) { }

    public async getCompany(id: number): Promise<Company> {
        try {
            const company = await this.companyRepository.findOne(id, { relations: ['roles'] });
            this.loggerService.log(`getCompany(${id})`, 'CompanyService');
            return company;
        } catch (error) {
            this.loggerService.error(`getCompany(${id})`, error.details || error, 'CompanyService');
            throw new InternalServerErrorException();
        }
    }

    public async addCompany(companyDto: CreateCompanyDto): Promise<Company> {
        let company: Company = this.companyRepository.create(companyDto);

        try {
            company = await this.companyRepository.save(company);
            company = await this.companyRepository.findOne(company.id);

            // TODO: add CEO role and creator to this role
            // TODO: add company log

            this.loggerService.log('addCompany()', 'CompanyService');
            return company;
        } catch (error) {
            this.loggerService.error('addCompany()', error.detail || error, 'CompanyService');
            throw new InternalServerErrorException();
        }
    }

    public async updateCompany(companyDto: UpdateCompanyDto) {
        let company: Company = this.companyRepository.create(companyDto);

        let updateResult: UpdateResult;

        try {
            updateResult = await this.companyRepository.update(company.id, company);
        } catch (error) {
            const errorMessage = error.detail || error;
            this.loggerService.error('updateCompany()', errorMessage, 'CompanyService');
            throw new InternalServerErrorException();
        }

        if (updateResult.affected === 0) {
            this.loggerService.log('updateCompany()', 'CompanyService');
            throw new EntityNotFoundByIdException();
        }

        try {
            company = await this.companyRepository.findOne(company.id);

            // TODO: add company log

            this.loggerService.log('updateCompany()', 'CompanyService');
            return company;
        } catch (error) {
            const messageError = error.detail || error;
            this.loggerService.error('updateCompany()', messageError, 'CompanyService');
            throw new InternalServerErrorException();
        }
    }
}