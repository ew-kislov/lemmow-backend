import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerService } from './service/LoggerService';
import { ValidationPipe } from './pipe/ValidationPipe';

@Global()
@Module({
    imports: [ConfigModule],
    exports: [LoggerService, ValidationPipe],
    providers: [LoggerService, ValidationPipe]
})
export class CoreModule { }
