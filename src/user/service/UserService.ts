import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, Like } from 'typeorm';

import { LoggerService } from '../../core/service/LoggerService';

import { User } from '../model/User';
import { CreateEmployeeDto } from '../dto/CreateEmployeeDto';
import { UpdateUserDto } from './../dto/UpdateUserDto';
import { UserFilter } from '../filter/UserFilter';

import { Company } from 'src/company/model/Company';
import { EntityNotFoundByIdException } from 'src/core/exception/EntityNotFoundException';
import { CreateOwnerDto } from '../dto/CreateOwnerDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        private readonly loggerService: LoggerService
    ) { }

    public async getAll(filter: UserFilter): Promise<User[]> {
        const whereClause = this.filterToWhereClause(filter);

        try {
            const users: User[] = await this.userRepository.find({
                where: whereClause,
                skip: (filter.page - 1) * filter.limit,
                take: filter.limit,
                relations: ['company', 'role'],
                order: {
                    id: 'ASC'
                }
            });

            this.loggerService.log('getUsers()', 'UserService');
            return users;
        } catch (error) {
            this.loggerService.error('getUsers()', error.detail, 'UserService');
            throw new BadRequestException();
        }
    }

    public async get(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne(id, { relations: ['company', 'invitor', 'role', 'role.companyPermissions'] });
            this.loggerService.log(`getUser(${id})`, 'UserService');
            return user;
        } catch (error) {
            this.loggerService.error(`getUser(${id})`, error.detail || error, 'UserService');
            throw new BadRequestException();
        }
    }

    public async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ email }, { relations: ['company', 'role', 'role.companyPermissions'] });
            this.loggerService.log(`getUserByEmail(${email})`, 'UserService');
            return user;
        } catch (error) {
            this.loggerService.error(`getUserByEmail(${email})`, error.detail, 'UserService');
            throw new BadRequestException();
        }
    }

    public async addOwner(userDto: CreateOwnerDto): Promise<User> {
        // TODO
        return null;
    }

    public async addToCompany(userDto: CreateEmployeeDto): Promise<User> {
        const user: User = this.userRepository.create(userDto);
        user.registrationDate = new Date();

        // TODO: check company existence

        if (userDto.companyId) {
            user.company = new Company({ id: userDto.companyId });
        } else {
            throw new BadRequestException();
        }

        try {
            const { id } = await this.userRepository.save(user);
            const createdUser: User = await this.userRepository.findOne(id, { relations: ['company', 'role'] });

            this.loggerService.log('addCompanyUser()', 'UserService');
            return createdUser;
        } catch (error) {
            this.loggerService.error('addCompanyUser()', error.detail, 'UserService');
            throw new BadRequestException();
        }
    }

    public async getCompanyUsers(companyId: number): Promise<User[]> {
        let company: Company;
        try {
            company = await this.companyRepository.findOne(companyId);
        } catch (error) {
            const errorMessage = error.detail || error;
            this.loggerService.error('getCompanyUsers()', errorMessage, 'UserService');
            throw new InternalServerErrorException();
        }

        if (!company) {
            throw new EntityNotFoundByIdException();
        }

        try {
            const users = await this.userRepository.find({ where: { company: { id: companyId } } });
            this.loggerService.log('getCompanyUsers()', 'UserService');
            return users;
        } catch (error) {
            const messageError = error.detail || error;
            this.loggerService.error('getCompanyUsers()', messageError, 'UserService');
            throw new BadRequestException();
        }
    }

    public async update(userDto: UpdateUserDto): Promise<User> {
        let user: User = this.userRepository.create(userDto);

        if (userDto.companyId) {
            user.company = new Company({ id: userDto.companyId });
        }

        try {
            await this.userRepository.update(user.id, user);
            user = await this.userRepository.findOne(user.id, { relations: ['company', 'role'] });

            this.loggerService.log('updateUser()', 'UserService');
            return user;
        } catch (error) {
            this.loggerService.error('updateUser()', error.detail, 'UserService');
            throw new BadRequestException();
        }
    }

    public async delete(id: number): Promise<User> {
        // TODO
        return null;
    }

    private filterToWhereClause(filter: UserFilter) {
        const whereClause: any = {};

        if (filter.companyId) {
            whereClause.company = { id: filter.companyId };
        }
        if (filter.roleId) {
            whereClause.role = { id: filter.roleId };
        }

        whereClause.name = Like(filter.name);
        whereClause.email = Like(filter.email);

        return whereClause;
    }
}