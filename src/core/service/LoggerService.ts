import { LoggerService as NestLoggerService } from '@nestjs/common';

export class LoggerService implements NestLoggerService {
    log(message: any, context: string) {
        console.log(`\x1b[32m[Info] \x1b[37m${new Date()} \x1b[33m[${context}] \x1b[32m${message}\x1b[37m`);
    }
    error(message: any, error: string, context: string) {
        console.error(`\x1b[31m[Error] \x1b[37m${new Date()} \x1b[33m[${context}] \x1b[32m${message} \x1b[37m${error}\x1b[37m`);
    }
    warn(message: any, context: string) {
        console.warn(`\x1b[33m[Warn] \x1b[37m${new Date()} \x1b[33m[${context}] \x1b[32m${message}\x1b[37m`);
    }
}