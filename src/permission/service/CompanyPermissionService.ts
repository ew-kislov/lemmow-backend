import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LoggerService } from '../../core/service/LoggerService';

import { CompanyPermission } from '../model/CompanyPermission';

@Injectable()
export class CompanyPermissionService {
    constructor(
        @InjectRepository(CompanyPermission) private companyPermissionRepository: Repository<CompanyPermission>,
        private readonly loggerService: LoggerService
    ) { }

    public async getCompanyPermissions(): Promise<CompanyPermission[]> {
        try {
            const companyPermissions = await this.companyPermissionRepository.find();
            this.loggerService.log('getCompanyPermissions()', 'CompanyPermissionService');
            return companyPermissions;
        } catch (error) {
            this.loggerService.error('getCompanyPermissions()', error.details || error, 'CompanyPermissionService');
            throw new InternalServerErrorException();
        }
    }
}