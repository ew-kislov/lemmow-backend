import { IsInt, MaxLength, IsAlpha, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { Transform, Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateUserDto {
    @IsInt()
    @Transform(value => Number(value))
    @Expose()
    id?: number;

    @IsOptional()
    @MaxLength(20)
    @IsAlpha()
    @Expose()
    firstName: string;

    @IsOptional()
    @MaxLength(20)
    @IsAlpha()
    @Expose()
    secondName: string;

    @IsOptional()
    @IsEmail()
    @IsOptional()
    @Expose()
    email: string;

    @IsOptional()
    @IsPhoneNumber(null)
    @Expose()
    phone?: string;

    @IsOptional()
    @IsInt()
    @Transform(value => value ? Number(value) : value)
    @Expose()
    companyId?: number;

    @IsOptional()
    @Expose()
    password: string;
}