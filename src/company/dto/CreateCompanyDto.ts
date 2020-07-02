import { MaxLength, IsDateString, IsDefined, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateCompanyDto {
    @MaxLength(20)
    @IsString()
    @IsDefined()
    @Expose()
    name: string;

    @IsDateString()
    @Expose()
    creationDate: Date;
}