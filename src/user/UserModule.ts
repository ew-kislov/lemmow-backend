import { Module } from '@nestjs/common';

import { UserService } from './service/UserService';
import { UserController } from './controller/UserController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/User';
import { Company } from '../company/model/Company';

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User, Company])],
    exports: [UserService]
})
export class UserModule { }