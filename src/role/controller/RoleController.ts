import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Body,
    Post,
    Put
} from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';

import { Role } from '../model/Role';
import { RoleService } from './../service/RoleService';
import { CreateRoleDto } from '../dto/CreateRoleDto';
import { ValidationPipe } from 'src/core/pipe/ValidationPipe';
import { UpdateRoleDto } from '../dto/UpdateRoleDto';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService, private readonly loggerService: LoggerService) { }

    @Get()
    public async getRoles(): Promise<Role[]> {
        this.loggerService.log(`GET /roles`, 'RoleController');

        return this.roleService.getRoles();
    }

    @Get(':id')
    public async getRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
        this.loggerService.log(`GET /roles/${id}`, 'RoleController');

        return this.roleService.getRole(id);
    }

    @Post()
    public async createRole(@Body(new ValidationPipe()) userDto: CreateRoleDto): Promise<Role> {
        this.loggerService.log('POST /roles', 'RoleController');

        // TODO: get user id/company id/permissions
        return this.roleService.addRole(userDto);
    }

    @Put()
    public async updateRole(@Body(new ValidationPipe()) roleDto: UpdateRoleDto): Promise<Role> {
        this.loggerService.log('PUT /roles', 'RoleController');

        return this.roleService.updateRole(roleDto);
    }
}