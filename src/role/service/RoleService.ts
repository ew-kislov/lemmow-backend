import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LoggerService } from '../../core/service/LoggerService';

import { Role } from '../model/Role';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private readonly loggerService: LoggerService
    ) { }

    public async getRoles(): Promise<Role[]> {
        try {
            const roles = await this.roleRepository.find({ relations: ['companyPermissions'] });
            this.loggerService.log('getRoles()', 'RoleService');
            return roles;
        } catch (error) {
            this.loggerService.error('getRoles()', error.details || error, 'RoleService');
            throw new InternalServerErrorException();
        }
    }
}