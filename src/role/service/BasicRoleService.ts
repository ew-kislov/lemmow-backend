import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LoggerService } from '../../core/service/LoggerService';

import { BasicRole } from '../model/BasicRole';

@Injectable()
export class BasicRoleService {
    constructor(
        @InjectRepository(BasicRole) private basicRoleRepository: Repository<BasicRole>,
        private readonly loggerService: LoggerService
    ) { }

    public async getBasicRoles(): Promise<BasicRole[]> {
        try {
            const basicRoles = await this.basicRoleRepository.find({ relations: ['companyPermissions'] });
            this.loggerService.log('getBasicRoles()', 'BasicRoleService');
            return basicRoles;
        } catch (error) {
            this.loggerService.error('getBasicRoles()', error.details || error, 'BasicRoleService');
            throw new InternalServerErrorException();
        }
    }
}