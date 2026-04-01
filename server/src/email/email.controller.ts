import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('verify')
  verifyEmail(@Query('token') token: string) {
    return this.emailService.verifyEmail(token);
  }
}
