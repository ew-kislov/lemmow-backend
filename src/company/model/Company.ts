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

    constructor(partial: Partial<Company>) {
        Object.assign(this, partial);
    }
}