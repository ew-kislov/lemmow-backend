import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LoggerService } from '../../core/service/LoggerService';

import { User } from '../model/User';
import { UserFilter } from '../filter/UserFilter';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly loggerService: LoggerService
    ) { }

    getUsers(filter: UserFilter): Promise<User[]> {
        this.loggerService.log('GET /users', 'UserController');

        return this.userRepository.find({
            where: {
                // companyId: filter.companyId
            },
            skip: (filter.page - 1) * filter.limit,
            take: filter.limit
        });
    }

    getUser(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }
}