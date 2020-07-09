import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);

        const errors = await validate(object, { skipMissingProperties: true });
        if (errors.length > 0) {
            const firstError = Object.values(errors[0].constraints);
            throw new BadRequestException(`Validation failed: ${firstError}`);
        }

        for (const key in object) {
            if (!object[key]) {
                delete object[key];
            }
        }

        return object;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}