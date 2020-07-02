import { IsInt, MaxLength, IsString, IsDateString, IsOptional } from 'class-validator';
import { Transform, Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateCompanyDto {
    @IsInt()
    @Transform(value => Number(value))
    @Expose()
    id?: number;

    @IsOptional()
    @MaxLength(20)
    @IsString()
    @Expose()
    name: string;

    @IsOptional()
    @IsDateString()
    @Expose()
    creationDate: Date;
}