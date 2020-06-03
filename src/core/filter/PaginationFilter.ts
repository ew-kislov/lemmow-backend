import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationFilter {
    @IsOptional()
    @IsInt()
    @Transform(value => Number(value))
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Transform(value => Number(value))
    limit: number = 10;
}