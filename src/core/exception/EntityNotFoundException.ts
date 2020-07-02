import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundByIdException extends HttpException {
    constructor() {
        super('No entity with given id', HttpStatus.BAD_REQUEST);
    }
}