import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionFormatter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = exception.getStatus();

        const exceptionResponse: any = exception.getResponse();
        const error = exceptionResponse.error || exceptionResponse.message || exceptionResponse;

        response
            .status(statusCode)
            .json({
                statusCode,
                error
            });
    }
}