import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Company } from './../../company/model/Company';

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

    @ManyToOne(type => Company, company => company.members)
    company?: Company;

    @Column()
    registrationDate: Date;

    @Column()
    loginDate: Date;

    @Exclude()
    @Column()
    password: string;
}