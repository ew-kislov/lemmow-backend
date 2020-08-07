import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LoggerService } from '../../core/service/LoggerService';

import { User } from '../model/User';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UpdateUserDto } from './../dto/UpdateUserDto';
import { UserFilter } from '../filter/UserFilter';

import { Company } from 'src/company/model/Company';
import { EntityNotFoundByIdException } from 'src/core/exception/EntityNotFoundException';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        private readonly loggerService: LoggerService
    ) { }

    public async getUsers(filter: UserFilter): Promise<User[]> {
        const whereClause: any = {};
        if (filter.companyId) {
            whereClause.company = { id: filter.companyId };
        }

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

    public async getUser(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne(id, { relations: ['company', 'role'] });

            this.loggerService.log(`getUser(${id})`, 'UserService');
            return user;
        } catch (error) {
            this.loggerService.error(`getUser(${id})`, error.detail, 'UserService');
            throw new BadRequestException();
        }
    }

    public async addUser(userDto: CreateUserDto): Promise<User> {
        let user: User = this.userRepository.create(userDto);

        if (userDto.companyId) {
            user.company = new Company({ id: userDto.companyId });
        }

        try {
            user = await this.userRepository.save(user);
            user = await this.userRepository.findOne(user.id, { relations: ['company', 'role'] });

            this.loggerService.log('addUser()', 'UserService');
            return user;
        } catch (error) {
            this.loggerService.error('addUser()', error.detail, 'UserService');
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
            throw new InternalServerErrorException();
        }
    }

    public async updateUser(userDto: UpdateUserDto): Promise<User> {
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
}