import { IsInt, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationFilter {
    @ValidateIf(obj => obj.limit)
    @IsInt()
    @Transform(value => Number(value))
    page: number = 1;

    @ValidateIf(obj => obj.page)
    @IsInt()
    @Transform(value => Number(value))
    limit: number = 10;
}