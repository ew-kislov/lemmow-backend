import { Controller, Get, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';

import { UserService } from '../service/UserService';
import { User } from '../model/User';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly loggerService: LoggerService) { }

    @Get('/')
    public async getUsers(): Promise<User[]> {
        this.loggerService.log('GET /users', 'UserController');
        return await this.userService.getUsers();
    }

    @Get(':id')
    public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        this.loggerService.log(`GET /users/${id}`, 'UserController');
        return this.userService.getUser(id);
    }
}