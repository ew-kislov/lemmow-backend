import { IsInt, MaxLength, IsAlpha, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { Transform, Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateOwnerDto {
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

    @IsAlpha()
    @Expose()
    password: string;
}