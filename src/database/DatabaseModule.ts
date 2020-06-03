import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT as unknown as number,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: ['dist/**/model/*{.ts,.js}'],
            synchronize: false,
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
            entityPrefix: 'lm_'
        }),
    ]
})
export class DatabaseModule { }
