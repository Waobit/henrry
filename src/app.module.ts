import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CosmosDBModule } from './dababases/cosmos.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionInterceptor } from './common/interceptors/http-exception.interceptor';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CosmosDBModule.forRoot(),
    AuthModule,
    UserModule,
    ServicesModule
  ],
  providers: [{
      provide: APP_INTERCEPTOR,
      useClass: HttpExceptionInterceptor,
    },],
})
export class AppModule { }
