import dbConfig from '@server/db/db.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from '../trpc/trpc.module';
import { DbModule } from '../db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from '@server/auth/auth.controller';
import { UsersService } from '@server/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    DbModule.register(dbConfig),
    AuthModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, UsersService],
})
export class AppModule {}
