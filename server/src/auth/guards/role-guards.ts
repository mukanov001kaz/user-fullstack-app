import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { AuthJwtTypePayload } from '../type/auth-jwt-type';

interface RequestUser extends Request {
  user: AuthJwtTypePayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest<RequestUser>();

    const user = request.user;

    if (!user) return false;

    if (!roles.includes(user.role)) {
      throw new ForbiddenException('У Вас нет доступа');
    }

    return true;
  }
}
