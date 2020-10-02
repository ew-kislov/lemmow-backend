import { IsInt, MaxLength, IsAlpha, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { Transform, Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateEmployeeDto {
    @MaxLength(20)
    @IsAlpha()
    @Expose()
    firstName: string;

    @MaxLength(20)
    @IsAlpha()
    @Expose()
    secondName: string;

    @IsEmail()
    @Expose()
    email: string;

    @IsOptional()
    @IsPhoneNumber(null)
    @Expose()
    phone?: string;

    @IsInt()
    @Transform(value => value ? Number(value) : value)
    @Expose()
    companyId?: number;
}