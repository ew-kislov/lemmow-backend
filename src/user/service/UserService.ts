import { Injectable } from '@nestjs/common';

import { User } from '../model/User';
// import { UserReporitory } from './../repository/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    getUser(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }
}