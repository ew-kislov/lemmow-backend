import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    constructor(partial: Partial<CompanyPermission>) {
        Object.assign(this, partial);
    }
}