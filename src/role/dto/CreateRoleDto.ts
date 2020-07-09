import { IsInt, MaxLength, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateRoleDto {
    @IsString()
    @Expose()
    name: string;

    @IsInt({ each: true })
    @Expose()
    permissions: number[];
}