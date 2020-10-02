import { Injectable, ExecutionContext } from '@nestjs/common';
import * as _ from 'lodash';

import { User } from '../model/User';
import { CompanyPermissionType } from 'src/permission/model/CompanyPermissionType';
import { PermissionGuard } from 'src/auth/guard/PermissionGuard';
import { JwtPayload } from 'src/auth/interface/JwtPayload';

@Injectable()
export abstract class BaseUserGuard extends PermissionGuard {
    protected async getTargetUser(context: ExecutionContext): Promise<User> {
        const request = context.switchToHttp().getRequest();
        const targetUserId: number = request.params.id;
        const targetUser: User = await this.userService.get(targetUserId);

        return targetUser;
    }

    protected findPermission(payload: JwtPayload, permission: CompanyPermissionType): boolean {
        return _.indexOf(payload.role.companyPermissions, permission) ? true : false;
    }
}