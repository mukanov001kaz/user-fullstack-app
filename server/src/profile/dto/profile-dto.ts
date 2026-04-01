import { IsInt, IsString } from 'class-validator';

export class ProfileDto {
  @IsInt()
  age: number;

  @IsString()
  phone: string;

  @IsString()
  adress: string;
}
