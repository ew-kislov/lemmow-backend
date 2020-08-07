import { Role } from '../../role/model/Role';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { User } from 'src/user/model/User';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    creationDate: Date;

    @OneToMany(type => User, user => user.company)
    members: User[];

    @OneToMany(type => Role, role => role.company)
    roles: Role[];

    constructor(partial: Partial<Company>) {
        Object.assign(this, partial);
    }
}