import { IsInt, IsOptional, IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { PaginationFilter } from '../../core/filter/PaginationFilter';

export class UserFilter extends PaginationFilter {
    @IsOptional()
    @IsInt()
    @Transform(value => Number(value))
    companyId: number;

    @IsOptional()
    @IsInt()
    @Transform(value => Number(value))
    roleId: number;

    @IsOptional()
    @IsString()
    name: string = '';

    @IsOptional()
    @IsEmail()
    email: string = '';
}