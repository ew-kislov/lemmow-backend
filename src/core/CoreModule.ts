import { DatabaseService } from './service/DatabaseService';
import { Module, Global } from '@nestjs/common';

import { LoggerService } from './service/LoggerService';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule],
    exports: [LoggerService, DatabaseService],
    providers: [LoggerService, DatabaseService]
})
export class CoreModule { }
