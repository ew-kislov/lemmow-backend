import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

import { DatabaseQuery } from '../interface/DatabaseQuery';
import { LoggerService } from './LoggerService';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor(private readonly loggerService: LoggerService) {
        this.pool = new Pool({
            host: 'localhost',
            port: 5432,
            database: 'lemmow',
            user: 'lemmow',
            password: 'lemmow'
        });
    }

    async executeQuery(query: string | DatabaseQuery): Promise<any> {
        let client: PoolClient;
        try {
            client = await this.pool.connect();
        } catch (error) {
            this.loggerService.error('Error while getting new client from poll', error.stack, 'DatabaseService');
            return [];
        }

        let result: any[];
        try {
            result = (await client.query(query)).rows;
            return result;
        } catch (error) {
            this.loggerService.error('Error while executing query', error.stack, 'DatabaseService');
            return [];
        } finally {
            client.release();
        }
    }
}