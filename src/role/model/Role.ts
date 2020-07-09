import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

import { CompanyPermission } from 'src/permission/model/CompanyPermission';

import { Company } from 'src/company/model/Company';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Company, company => company.roles)
    company: Company;

    @ManyToMany(type => CompanyPermission)
    @JoinTable({
        name: 'role_company_permission_join',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'permission_id' }]
    })
    companyPermissions: CompanyPermission[];

    constructor(partial: Partial<Role>) {
        Object.assign(this, partial);
    }
}