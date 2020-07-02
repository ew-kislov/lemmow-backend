import {
    Controller,
    Get
} from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';

import { BasicRole } from '../model/BasicRole';
import { BasicRoleService } from './../service/BasicRoleService';

@Controller('basic-roles')
export class BasicRoleController {
    constructor(private readonly basicRoleService: BasicRoleService, private readonly loggerService: LoggerService) { }

    @Get()
    public async getBasicRoles(): Promise<BasicRole[]> {
        this.loggerService.log(`GET /basic-roles/`, 'BasicRoleController');

        return this.basicRoleService.getBasicRoles();
    }
}