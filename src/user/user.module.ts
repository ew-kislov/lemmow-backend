import { Module, Logger } from '@nestjs/common';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [SharedModule],

    providers: [UserService],
    controllers: [UserController]
})
export class UserModule { }