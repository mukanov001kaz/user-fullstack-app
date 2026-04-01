import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user-entity';

export class AuthJwtGuards extends AuthGuard('jwt') {
  handleRequest<T = UserEntity>(err: unknown, user: T) {
    if (err || !user) {
      throw new UnauthorizedException('Вам необходимо войти !!');
    }
    return user;
  }
}
