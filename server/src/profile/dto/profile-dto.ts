import { IsInt, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  age: string;

  @IsString()
  phone: string;

  @IsString()
  adress: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  avatarPublicId: string;
}
