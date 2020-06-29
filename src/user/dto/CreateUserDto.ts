import { IsInt, MaxLength, IsAlpha, IsEmail, IsPhoneNumber, IsDateString, IsOptional } from 'class-validator';
import { Transform, Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
    @MaxLength(20)
    @IsAlpha()
    @Expose()
    firstName: string;

    @MaxLength(20)
    @IsAlpha()
    @Expose()
    secondName: string;

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

    @IsDateString()
    @Expose()
    registrationDate: Date;

    @Expose()
    password: string;
}