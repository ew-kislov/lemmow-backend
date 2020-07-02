import { CompanyPermissionService } from './../service/CompanyPermissionService';
import {
    Controller,
    Get
} from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';

import { CompanyPermission } from './../model/CompanyPermission';

@Controller('company-permissions')
export class CompanyPermissionController {
    constructor(
        private readonly companyPermissionService: CompanyPermissionService,
        private readonly loggerService: LoggerService
    ) { }

    @Get()
    public async getCompanyPermissions(): Promise<CompanyPermission[]> {
        this.loggerService.log(`GET /company-permissions/`, 'CompanyPermissionsController');

        return this.companyPermissionService.getCompanyPermissions();
    }
}