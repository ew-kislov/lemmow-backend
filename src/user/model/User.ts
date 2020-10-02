import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Company } from './../../company/model/Company';
import { Role } from './../../role/model/Role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone?: string;

    @ManyToOne(type => Role)
    role?: Role;

    @Column()
    registrationDate: Date;

    @Column()
    lastActivityDate: Date;

    @Exclude()
    @Column()
    password: string;

    @ManyToOne(type => Company, company => company.members)
    company?: Company;

    @ManyToOne(type => User)
    invitor: User;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}