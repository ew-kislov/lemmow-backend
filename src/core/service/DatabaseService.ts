import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

import { DatabaseQuery } from '../interface/DatabaseQuery';
import { LoggerService } from './LoggerService';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor(private readonly loggerService: LoggerService, private readonly configService: ConfigService) {
        this.pool = new Pool({
            host: configService.get<string>('PSQL_HOST'),
            port: configService.get<number>('PSQL_PORT'),
            database: configService.get<string>('PSQL_DB'),
            user: configService.get<string>('PSQL_USER'),
            password: configService.get<string>('PSQL_PASSWORD')
        });
    }

    async executeQuery(query: string | DatabaseQuery): Promise<any> {
        let client: PoolClient;
        try {
            client = await this.pool.connect();
        } catch (error) {
            this.loggerService.error('Error while getting new client from poll', error.stack, 'DatabaseService');
            throw new InternalServerErrorException();
        }

        let result: any[];
        try {
            result = (await client.query(query)).rows;
            return result;
        } catch (error) {
            this.loggerService.error('Error while executing query', error.stack, 'DatabaseService');
            throw new InternalServerErrorException();
        } finally {
            client.release();
        }
    }
}