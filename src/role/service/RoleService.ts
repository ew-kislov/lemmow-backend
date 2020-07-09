import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, In, UpdateResult } from 'typeorm';

import * as lodash from 'lodash';

import { LoggerService } from '../../core/service/LoggerService';

import { Role } from '../model/Role';
import { CreateRoleDto } from '../dto/CreateRoleDto';

import { CompanyPermission } from 'src/permission/model/CompanyPermission';
import { UpdateRoleDto } from '../dto/UpdateRoleDto';
import { EntityNotFoundByIdException } from 'src/core/exception/EntityNotFoundException';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(CompanyPermission) private companyPermissionRepository: Repository<CompanyPermission>,
        private readonly loggerService: LoggerService
    ) { }

    public async getRoles(): Promise<Role[]> {
        try {
            const roles = await this.roleRepository.find({ relations: ['companyPermissions'] });
            this.loggerService.log('getRoles()', 'RoleService');
            return roles;
        } catch (error) {
            this.loggerService.error('getRoles()', error.details || error, 'RoleService');
            throw new InternalServerErrorException();
        }
    }

    public async getRole(id: number): Promise<Role> {
        try {
            const role = await this.roleRepository.findOne(id, { relations: ['companyPermissions'] });
            this.loggerService.log('getRole()', 'RoleService');
            return role;
        } catch (error) {
            this.loggerService.error('getRole()', error.details || error, 'RoleService');
            throw new InternalServerErrorException();
        }
    }

    public async addRole(roleDto: CreateRoleDto): Promise<Role> {
        await this.validatePermissionIds(roleDto.permissions);

        try {
            let role: Role = this.roleRepository.create(roleDto);

            role.companyPermissions = [];
            for (const permissionId of roleDto.permissions) {
                role.companyPermissions.push(new CompanyPermission({ id: permissionId }));
            }

            role = await this.roleRepository.save(role);
            role = await this.roleRepository.findOne(role.id, { relations: ['companyPermissions'] });

            // TODO: add company log

            this.loggerService.log('addRole()', 'RoleService');
            return role;
        } catch (error) {
            this.loggerService.error('addRole()', error.detail || error, 'RoleService');
            throw new InternalServerErrorException();
        }
    }

    public async updateRole(roleDto: UpdateRoleDto) {
        await this.validatePermissionIds(roleDto.permissions);

        let role: Role;

        try {
            role = await this.roleRepository.findOne(roleDto.id);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        if (!role) {
            this.loggerService.log('updateRole()', 'RoleService');
            throw new EntityNotFoundByIdException();
        }

        try {
            role = this.roleRepository.create(roleDto);

            role.companyPermissions = [];
            for (const permissionId of roleDto.permissions) {
                role.companyPermissions.push(new CompanyPermission({ id: permissionId }));
            }

            await this.roleRepository.save(role);
        } catch (error) {
            const errorMessage = error.detail || error;
            this.loggerService.error('updateRole()', errorMessage, 'RoleService');
            throw new InternalServerErrorException();
        }

        // TODO: add company log

        try {
            role = await this.roleRepository.findOne(role.id, { relations: ['companyPermissions'] });

            this.loggerService.log('updateRole()', 'RoleService');
            return role;
        } catch (error) {
            const messageError = error.detail || error;
            this.loggerService.error('updateRole()', messageError, 'RoleService');
            throw new InternalServerErrorException();
        }
    }

    private async validatePermissionIds(permissionIds: number[]) {
        let permissions: CompanyPermission[];

        try {
            permissions = await this.companyPermissionRepository.find({
                where: { id: In(permissionIds) }
            });
        } catch (error) {
            this.loggerService.error('validatePermissionIds()', error.detail || error, 'RoleService');
            throw new InternalServerErrorException();
        }

        if (permissions.length !== permissionIds.length) {
            const foundPermissionIds = permissions.map((permission) => permission.id);
            const permissionsDifference = lodash.difference(permissionIds, foundPermissionIds);

            throw new BadRequestException(null, `Permission with id ${permissionsDifference[0]} doesn't exist`);
        }
    }
}