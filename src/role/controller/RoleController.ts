import {
    Controller,
    Get
} from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';

import { Role } from '../model/Role';
import { RoleService } from './../service/RoleService';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService, private readonly loggerService: LoggerService) { }

    @Get()
    public async getRoles(): Promise<Role[]> {
        this.loggerService.log(`GET /roles/`, 'RoleController');

        return this.roleService.getRoles();
    }
}