import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwtPayload } from 'src/auth/interface/JwtPayload';
import { UserService } from 'src/user/service/UserService';

@Injectable()
export abstract class PermissionGuard implements CanActivate {
    constructor(protected readonly userService: UserService) { }

    public abstract canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;

    protected getJwtPayload(context: ExecutionContext): JwtPayload {
        const request = context.switchToHttp().getRequest();
        const payload: JwtPayload = request.user;

        return payload;
    }
}