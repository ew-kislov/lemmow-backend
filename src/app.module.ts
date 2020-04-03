import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,

    ConfigModule.forRoot({
      envFilePath: '.env.dev'
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
