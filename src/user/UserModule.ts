import { Module } from '@nestjs/common';

import { UserService } from './service/UserService';
import { UserReporitory } from './repository/UserRepository';
import { UserController } from './controller/UserController';

@Module({
    providers: [UserReporitory, UserService],
    controllers: [UserController]
})
export class UserModule { }