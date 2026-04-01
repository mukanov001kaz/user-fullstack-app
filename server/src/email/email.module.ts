import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.getOrThrow<string>('GMAIL_HOST'),
          port: config.getOrThrow<number>('GMAIL_PORT'),
          secure: false,
          auth: {
            user: config.getOrThrow<string>('GMAIL_USER'),
            pass: config.getOrThrow<string>('GMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Mukanov Birzhan" <${config.getOrThrow<string>('GMAIL_USER')}>`,
        },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
