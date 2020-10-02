import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/service/UserService';
import { User } from 'src/user/model/User';
import { JwtPayload } from '../interface/JwtPayload';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user: User = await this.userService.getUserByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    login(user: User): string {
        const payloadRole = {
            id: user.role.id,
            companyPermissions: user.role.companyPermissions.map((permission) => permission.id)
        };
        const payload: JwtPayload = { id: user.id, companyId: user.company.id, role: payloadRole };
        return this.jwtService.sign(payload);
    }
}