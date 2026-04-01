import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserDto } from 'src/user/dto/created-user.dto';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';
import { UserEntity } from 'src/user/entities/user-entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreatedUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
    return this.authService.login(res, dto);
  }

  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res);
  }

  @Post('logout/:id')
  async logout(
    @Param('id') id: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return await this.authService.logout(id, res);
  }
}
