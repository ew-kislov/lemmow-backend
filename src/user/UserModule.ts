import { Module } from '@nestjs/common';

import { UserService } from './service/UserService';
// import { UserReporitory } from './repository/UserRepository';
import { UserController } from './controller/UserController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/User';

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }