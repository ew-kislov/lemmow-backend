import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { PaginationFilter } from '../../core/filter/PaginationFilter';

export class UserFilter extends PaginationFilter {
    @IsOptional()
    @IsInt()
    @Transform(value => Number(value))
    companyId: number;
}