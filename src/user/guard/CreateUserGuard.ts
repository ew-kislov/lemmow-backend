import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';

import { User } from '../model/User';
import { CompanyPermissionType } from 'src/permission/model/CompanyPermissionType';
import { BaseUserGuard } from './BaseUserGuard';
import { JwtPayload } from 'src/auth/interface/JwtPayload';

@Injectable()
export class CreateUserGuard extends BaseUserGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const payload: JwtPayload = this.getJwtPayload(context);

        const manageYourEmployeesPermission = this.findPermission(payload, CompanyPermissionType.MANAGE_YOUR_EMPLOYEES);
        if (manageYourEmployeesPermission) {
            return true;
        }
        throw new ForbiddenException(null, `You don't have permission to create users`);
    }
}