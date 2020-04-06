import { Controller, Get } from '@nestjs/common';

import { LoggerService } from '../../shared/service/LoggerService';

import { UserService } from './../service/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly loggerService: LoggerService) { }

    @Get('/')
    getUsers(): string {
        this.loggerService.log('GET /users', 'UserController');
        return 'Mocked';
    }
}