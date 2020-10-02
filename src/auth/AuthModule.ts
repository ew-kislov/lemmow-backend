import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from 'src/user/UserModule';
import { AuthService } from './service/AuthService';
import { LocalStrategy } from './strategy/LocalStrategy';
import { AuthController } from './controller/AuthController';
import { JwtStrategy } from './strategy/JwtStrategy';
import { User } from 'src/user/model/User';

@Module({
    imports: [
        ConfigModule,
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: configService.get('JWT_EXPIRES') },
            })
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
