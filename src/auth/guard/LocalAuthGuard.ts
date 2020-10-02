import {
    ExecutionContext,
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw new BadRequestException('Wrong credentials');
        }
        return user;
    }
}
