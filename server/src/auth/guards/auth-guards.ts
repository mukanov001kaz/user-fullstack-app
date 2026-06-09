import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user-entity';
import { TokenExpiredError } from 'jsonwebtoken';

export class AuthJwtGuards extends AuthGuard('jwt') {
  // handleRequest<T = UserEntity>(err: unknown, user: T) {
  //   if (err || !user) {
  //     throw new UnauthorizedException('Вам необходимо войти !!');
  //   }
  //   return user;
  // }
  handleRequest<T = UserEntity>(err: unknown, user: T, info: unknown): T {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException(
        'Срок действия токена истек. Обновите токен.',
      );
    }
    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
    return user;
  }
}
