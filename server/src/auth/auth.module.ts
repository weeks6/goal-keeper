import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@server/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';
import { UsersService } from '@server/users/users.service';
import { AppService } from '@server/app/app.service';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AppService,
    UsersService,
    AuthService,
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
