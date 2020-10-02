import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';

import { User } from '../model/User';
import { CompanyPermissionType } from 'src/permission/model/CompanyPermissionType';
import { BaseUserGuard } from './BaseUserGuard';
import { JwtPayload } from 'src/auth/interface/JwtPayload';

@Injectable()
export class ReadUserGuard extends BaseUserGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const payload: JwtPayload = this.getJwtPayload(context);
        const targetUser: User = await this.getTargetUser(context);

        if (!targetUser) {
            return true;
        }

        if (payload.companyId !== targetUser.company.id) {
            throw new ForbiddenException(null, `This user doesn't belong your company`);
        }

        const viewEmployeePermission = this.findPermission(payload, CompanyPermissionType.VIEW_EMPLOYEES);
        console.log(payload);
        if (viewEmployeePermission) {
            return true;
        }
        throw new ForbiddenException(null, `You don't have permission to view this user`);
    }
}