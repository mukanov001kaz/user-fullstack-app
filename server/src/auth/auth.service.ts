import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatedUserDto } from 'src/user/dto/created-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthJwtTypePayload } from './type/auth-jwt-type';
import { UserRole } from 'src/user/enum/user-enum';
import { Response, Request } from 'express';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN: string;
  private readonly JWT_REFRESH_TOKEN: string;

  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN =
      this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN');
    this.JWT_REFRESH_TOKEN =
      this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN');
  }

  async register(dto: CreatedUserDto) {
    await this.userService.createUser(dto);

    await this.sendEmail(dto.email);

    return {
      message: 'registrationSuccess',
    };
  }

  async login(res: Response, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Пользователь не найден');

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Подтвердите email');
    }

    const comparePassword = await this.compare(dto.password, user.password);

    if (!comparePassword)
      throw new UnauthorizedException('Неверный email или пароль');

    return this.auth(res, user.id, user.role, user.name);
  }

  private compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }

  private hash(value: string) {
    return bcrypt.hash(value, 10);
  }

  private async auth(res: Response, id: string, role: UserRole, name: string) {
    const { accessToken, refreshToken } = this.genereteTokens(name, id, role);
    const hashRefreshToken = await this.hash(refreshToken);

    await this.userService.setCurrentRefreshToken(id, hashRefreshToken);

    this.setCookie(res, refreshToken);

    return { accessToken, id, name };
  }

  private genereteTokens(name: string, id: string, role: UserRole) {
    const payload: AuthJwtTypePayload = { name, id, role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN as never,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN as never,
    });

    return { accessToken, refreshToken };
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken as string | undefined;

    if (!refreshToken) {
      throw new UnauthorizedException('Не действительный токен');
    }

    let payload: AuthJwtTypePayload;

    try {
      payload =
        await this.jwtService.verifyAsync<AuthJwtTypePayload>(refreshToken);
    } catch {
      throw new UnauthorizedException('Токен не валидный');
    }

    const user = await this.userService.findById(payload.id);

    if (!user.refreshToken) {
      throw new UnauthorizedException('Токен в базе отсутствует');
    }

    const isToken = await this.compare(refreshToken, user.refreshToken);

    if (!isToken) {
      throw new UnauthorizedException('Токен не совпадает');
    }

    return this.auth(res, user.id, user.role, user.name);
  }

  private setCookie(res: Response, value: string) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  async logout(id: string, res: Response) {
    await this.userService.removeRefreshToken(id);

    res.clearCookie('refreshToken');

    return { message: 'Вы покинули страницу' };
  }

  generateEmailToken(email: string): string {
    const payload = { email, type: 'verify-email' };

    return this.jwtService.sign(payload, {
      expiresIn: '20m',
    });
  }

  async sendEmail(email: string) {
    const token = this.generateEmailToken(email);

    const link = `http://localhost:3000/email-verify?token=${token}`;
    console.log('sendEmail', email);

    return await this.emailService.sendVerifyEmail(email, link);
  }
}
