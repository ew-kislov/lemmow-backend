import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Body,
    Put,
    UseGuards,
    HttpCode,
    Delete
} from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';
import { ValidationPipe } from '../../core/pipe/ValidationPipe';

import { User } from '../model/User';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { UserService } from '../service/UserService';
import { JwtAuthGuard } from '../../auth/guard/JwtAuthGuard';
import { ReadUserGuard } from '../guard/ReadUserGuard';
import { ManageUserGuard } from '../guard/ManageUserGuard';
import { CreateUserGuard } from '../guard/CreateUserGuard';
import { CreateOwnerDto } from '../dto/CreateOwnerDto';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly loggerService: LoggerService) { }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(ReadUserGuard)
    public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        this.loggerService.log(`GET /users/${id}`, 'UserController');
        return await this.userService.get(id);
    }

    @Post('create-owner')
    @HttpCode(201)
    @UseGuards(CreateUserGuard)
    public async createOwner(@Body(new ValidationPipe()) userDto: CreateOwnerDto): Promise<User> {
        this.loggerService.log('POST /users', 'UserController');
        return await this.userService.addOwner(userDto);
    }

    @Put()
    @HttpCode(200)
    @UseGuards(ManageUserGuard)
    public async updateUser(@Body(new ValidationPipe()) userDto: UpdateUserDto): Promise<User> {
        this.loggerService.log('PUT /users', 'UserController');
        return await this.userService.update(userDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UseGuards(ManageUserGuard)
    public async removeUser(@Param('id', ParseIntPipe) id: number) {
        this.loggerService.log('DELETE /users', 'UserController');
        return await this.userService.delete(id);
    }
}