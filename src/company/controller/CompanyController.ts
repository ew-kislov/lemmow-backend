import { UserService } from './../../user/service/UserService';
import { RoleService } from './../../role/service/RoleService';
import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Body,
    Put, UseGuards
} from '@nestjs/common';

import { LoggerService } from '../../core/service/LoggerService';
import { ValidationPipe } from '../../core/pipe/ValidationPipe';

import { Company } from '../model/Company';
import { CompanyService } from '../service/CompanyService';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { UpdateCompanyDto } from '../dto/UpdateCompanyDto';

import { Role } from 'src/role/model/Role';
import { User } from 'src/user/model/User';
import { AuthUser } from 'src/core/decorator/AuthUser';
import { JwtPayload } from 'src/auth/interface/JwtPayload';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuthGuard';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('companies')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
        private readonly roleService: RoleService,
        private readonly userService: UserService,
        private readonly loggerService: LoggerService
    ) { }

    @Get(':id')
    public async getCompany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
        this.loggerService.log(`GET /companies/${id}`, 'CompanyController');

        return this.companyService.getCompany(id);
    }

    @Post()
    public async createCompany(@Body(new ValidationPipe()) companyDto: CreateCompanyDto, @AuthUser() jwtPayload: JwtPayload): Promise<Company> {
        this.loggerService.log('POST /companies', 'CompanyController');

        return this.companyService.addCompany(companyDto, jwtPayload);
    }

    @Put()
    public async updateCompany(@Body(new ValidationPipe()) companyDto: UpdateCompanyDto) {
        this.loggerService.log('PUT /companies', 'updateCompany');

        return this.companyService.updateCompany(companyDto);
    }

    @Get(':id/roles')
    public async getCompanyRoles(@Param('id', ParseIntPipe) id: number): Promise<Role[]> {
        return this.roleService.getCompanyRoles(id);
    }

    @Get(':id/users')
    public async getCompanyUsers(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
        return this.userService.getCompanyUsers(id);
    }

    @Post('invite-user')
    public async inviteUser() {
        // TODO
    }
}