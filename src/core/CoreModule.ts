import { DatabaseService } from './service/DatabaseService';
import { Module, Global } from '@nestjs/common';

import { LoggerService } from './service/LoggerService';

@Global()
@Module({
    exports: [LoggerService, DatabaseService],
    providers: [LoggerService, DatabaseService]
})
export class CoreModule { }
