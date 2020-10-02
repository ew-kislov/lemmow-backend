import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_POST'),
                username: configService.get('POSTGRES_USERNAME'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DATABASE'),
                entities: ['dist/**/model/*{.ts,.js}'],
                synchronize: false,
                logging: true,
                namingStrategy: new SnakeNamingStrategy(),
                entityPrefix: 'lm_'
            })
        }),
    ]
})
export class DatabaseModule { }
