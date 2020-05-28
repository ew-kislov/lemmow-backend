import { Controller, Get, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';

import { UserService } from '../service/UserService';
import { User } from '../model/User';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly loggerService: LoggerService) { }

    @Get('/')
    public getUsers(): Promise<User[]> {
        this.loggerService.log('GET /users', 'UserController');
        return this.userService.getUsers();
    }

    @Get(':id')
    public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        this.loggerService.log(`GET /users/${id}`, 'UserController');
        const user = await this.userService.getUser(id);

        if (user) {
            return user;
        } else {
            throw new NotFoundException();
        }
    }
}