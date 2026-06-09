import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('verify')
  verifyEmail(@Body('token') token: string) {
    return this.emailService.verifyEmail(token);
  }
}
