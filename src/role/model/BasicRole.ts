import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import { CompanyPermission } from '../../permission/model/CompanyPermission';


@Entity()
export class BasicRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => CompanyPermission)
    @JoinTable({
        name: 'basic_role_company_permission_join',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'permission_id' }]
    })
    companyPermissions: CompanyPermission[];

    constructor(partial: Partial<BasicRole>) {
        Object.assign(this, partial);
    }
}