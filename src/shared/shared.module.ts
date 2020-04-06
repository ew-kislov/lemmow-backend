import { Module } from '@nestjs/common';

import { LoggerService } from './service/LoggerService';

@Module({
    exports: [LoggerService],
    providers: [LoggerService]
})
export class SharedModule { }
