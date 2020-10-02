import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            const message = _.capitalize(info.message);
            throw err || new UnauthorizedException(message);
        }
        return user;
    }
}
