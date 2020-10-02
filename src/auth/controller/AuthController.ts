import { Controller, Post, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

import { AuthService } from '../service/AuthService';
import { User } from 'src/user/model/User';
import { JwtAuthGuard } from '../guard/JwtAuthGuard';
import { LocalAuthGuard } from '../guard/LocalAuthGuard';
import { AuthUser } from 'src/core/decorator/AuthUser';
import { UserService } from 'src/user/service/UserService';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@AuthUser() user: User): string {
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@AuthUser() user: User): Promise<User> {
        return await this.userService.get(user.id);
    }
}