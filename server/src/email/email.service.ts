import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { EmailVerifyType } from './type/email-verify.type';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async sendVerifyEmail(email: string, link: string): Promise<object> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Подтвердите почту',
      text: `Перейдите по ссылке для подтверждение почты  ${link}`,
    });

    return { message: 'Письмо отправленно на Ваш email' };
  }

  async verifyEmail(token: string) {
    if (!token) {
      throw new BadRequestException('Токен отсутствует');
    }
    const payload = await this.jwtService.verifyAsync<EmailVerifyType>(token);

    if (payload.type !== 'verify-email') {
      throw new BadRequestException('Не верный токен');
    }

    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    if (user.isEmailVerified) {
      return { message: 'Email уже подтвержден' };
    }

    user.isEmailVerified = true;

    await this.userService.save(user);

    return { message: 'Email подтвержден' };
  }
}
