import {
  Body,
  Controller,
  Get,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AppService } from '@server/app/app.service';
import { UsersService } from '@server/users/users.service';
import bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get('test')
  async test() {
    return 'test';
  }

  @Post('register')
  async register(
    @Body() data: { username: string; email: string; password: string },
  ) {
    if (await this.usersService.findByEmail(data.email))
      return new UnprocessableEntityException(data);

    try {
      const user = await this.usersService.create({
        username: data.username,
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
      });

      return user;
    } catch (error) {
      return new UnprocessableEntityException(data);
    }
  }
}
