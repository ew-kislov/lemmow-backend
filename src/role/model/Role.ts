import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import { CompanyPermission } from 'src/permission/model/CompanyPermission';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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