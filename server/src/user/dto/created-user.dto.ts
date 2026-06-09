import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatedUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Пароль должен быть минимум 6 символов' })
  password!: string;
}
