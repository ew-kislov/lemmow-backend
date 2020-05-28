import { Injectable } from '@nestjs/common';

import { DatabaseQuery } from './../../core/interface/DatabaseQuery';
import { DatabaseService } from './../../core/service/DatabaseService';

import { User } from '../model/User';

@Injectable()
export class UserReporitory {
    constructor(private readonly databaseService: DatabaseService) { }

    public async getUsers(): Promise<User[]> {
        const query: DatabaseQuery = {
            name: 'get_users',
            text:
                `SELECT
                    id,
                    first_name as firstName,
                    second_name as secondName,
                    email,
                    password,
                    phone,
                    registration_date as registrationDate,
                    login_date as loginDate,
                    company_id as companyId
                FROM
                    lm_user`
        };

        return this.databaseService.executeQuery(query);
    }

    public async getUser(id: number): Promise<User> {
        const query: DatabaseQuery = {
            name: 'get_user',
            text:
                `SELECT
                    id,
                    first_name as firstName,
                    second_name as secondName,
                    email,
                    password,
                    phone,
                    registration_date as registrationDate,
                    login_date as loginDate,
                    company_id as companyId
                FROM
                    lm_user
                WHERE id = $1`,
            values: [id]
        };

        const users: User[] = await this.databaseService.executeQuery(query);
        return users.length === 1 ? users[0] : null;
    }
}