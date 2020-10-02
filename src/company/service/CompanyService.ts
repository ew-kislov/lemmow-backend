import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ = require('lodash');

import { EntityNotFoundByIdException } from './../../core/exception/EntityNotFoundException';

import { Repository, UpdateResult } from 'typeorm';

import { LoggerService } from '../../core/service/LoggerService';

import { Company } from 'src/company/model/Company';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { UpdateCompanyDto } from '../dto/UpdateCompanyDto';
import { BasicRoleService } from 'src/role/service/BasicRoleService';
import { Role } from 'src/role/model/Role';
import { JwtPayload } from 'src/auth/interface/JwtPayload';
import { User } from 'src/user/model/User';
import { BasicRoleType } from 'src/role/model/BasicRoleType';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly basicRoleService: BasicRoleService,
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

    public async addCompany(companyDto: CreateCompanyDto, jwtPayload: JwtPayload): Promise<Company> {
        if (jwtPayload.companyId) {
            throw new BadRequestException('Your profile already belongs to company');
        }

        let company: Company = this.companyRepository.create(companyDto);

        try {
            const basicRoles = await this.basicRoleService.getBasicRoles();
            const basicOwnerRole = _.find(basicRoles, { id: BasicRoleType.CEO });
            const roles: Role[] = this.roleRepository.create(basicRoles);
            roles.forEach(role => delete role.id);
            company.roles = roles;

            company = await this.companyRepository.save(company);
            company = await this.companyRepository.findOne(company.id, { relations: ['roles'] });

            const ownerRole = _.find(company.roles, { name: basicOwnerRole.name });
            const user = new User({ id: jwtPayload.id, role: ownerRole });
            this.userRepository.save(user);

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

            this.loggerService.log('updateCompany()', 'CompanyService');
            return company;
        } catch (error) {
            const messageError = error.detail || error;
            this.loggerService.error('updateCompany()', messageError, 'CompanyService');
            throw new InternalServerErrorException();
        }
    }
}