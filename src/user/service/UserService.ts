import { Injectable } from '@nestjs/common';

import { User } from './../model/User';
import { UserReporitory } from './../repository/UserRepository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserReporitory) { }

    getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }

    getUser(id: number): Promise<User> {
        return this.userRepository.getUser(id);
    }
}