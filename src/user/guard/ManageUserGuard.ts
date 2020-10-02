import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';

import { User } from '../model/User';
import { BaseUserGuard } from './BaseUserGuard';
import { CompanyPermissionType } from 'src/permission/model/CompanyPermissionType';
import { JwtPayload } from 'src/auth/interface/JwtPayload';

@Injectable()
export class ManageUserGuard extends BaseUserGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const payload: JwtPayload = this.getJwtPayload(context);
        const targetUser: User = await this.getTargetUser(context);

        if (payload.companyId === targetUser.company.id) {
            throw new ForbiddenException(null, `This user doesn't belong your company`);
        }

        const manageYourEmployeesPermission = this.findPermission(payload, CompanyPermissionType.MANAGE_YOUR_EMPLOYEES);
        const manageAllEmployeesPermission = this.findPermission(payload, CompanyPermissionType.MANAGE_ALL_EMPLOYEES);
        if (manageYourEmployeesPermission && targetUser.invitor.id === payload.id || manageAllEmployeesPermission) {
            return true;
        }
        throw new ForbiddenException(null, `You don't have permission to manage this user`);
    }
}