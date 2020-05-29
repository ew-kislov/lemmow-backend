import { Exclude } from 'class-transformer';

export class User {
    id: number;
    firstName: string;
    secondName: string;
    email: string;
    phone?: string;
    registrationDate: Date;
    loginDate: Date;

    @Exclude()
    password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}