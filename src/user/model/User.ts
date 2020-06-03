import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    secondName: string;

    @Column()
    email: string;

    @Column()
    phone?: string;

    @Column()
    registrationDate: Date;

    @Column()
    loginDate: Date;

    @Exclude()
    @Column()
    password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}