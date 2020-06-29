import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    Query,
    Post,
    Body,
    Put
} from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';
import { ValidationPipe } from '../../core/pipe/ValidationPipe';

import { User } from '../model/User';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { UserService } from '../service/UserService';
import { UserFilter } from '../filter/UserFilter';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly loggerService: LoggerService) { }

    @Get('/')
    public async getUsers(@Query(new ValidationPipe()) filter: UserFilter): Promise<User[]> {
        this.loggerService.log('GET /users', 'UserController');

        return await this.userService.getUsers(filter);
    }

    @Get(':id')
    public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        this.loggerService.log(`GET /users/${id}`, 'UserController');

        return this.userService.getUser(id);
    }

    @Post()
    public async createUser(@Body(new ValidationPipe()) userDto: CreateUserDto): Promise<User> {
        this.loggerService.log('POST /users', 'UserController');

        return this.userService.addUser(userDto);
    }

    @Put()
    public async updateUser(@Body(new ValidationPipe()) userDto: UpdateUserDto): Promise<User> {
        this.loggerService.log('PUT /users', 'UserController');

        return this.userService.updateUser(userDto);
    }
}