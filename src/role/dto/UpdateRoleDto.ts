import { IsInt, MaxLength, IsString, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateRoleDto {
    @IsInt()
    // @Transform(value => Number(value))
    @Expose()
    id?: number;

    @IsString()
    @IsOptional()
    @Expose()
    name: string;

    @IsInt({ each: true })
    @IsOptional()
    @Expose()
    permissions: number[];
}