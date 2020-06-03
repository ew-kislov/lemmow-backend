import { ValidationPipe } from './pipe/ValidationPipe';
import { Module, Global } from '@nestjs/common';

import { LoggerService } from './service/LoggerService';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule],
    exports: [LoggerService, ValidationPipe],
    providers: [LoggerService, ValidationPipe]
})
export class CoreModule { }
