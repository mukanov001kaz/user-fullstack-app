import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile-dto';
// import { AuthJwtGuards } from 'src/auth/guards/auth-guards';
import { GetParamUser } from 'src/user/decorators/get-user.decorators';
import { UserEntity } from 'src/user/entities/user-entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Express } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('all')
  getProfile() {
    return this.profileService.getAllProfile();
  }

  // @UseGuards(AuthJwtGuards)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  createProfile(
    @GetParamUser() user: UserEntity,
    @Body() dto: ProfileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /\/(jpg|jpeg|png)$/,
            errorMessage:
              'Недопустимый тип файла. Разрешены только изображения (jpg, jpeg, png).',
          }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024,
            errorMessage: 'Максимальный размер файла - 1 МБ.',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.profileService.createProfile(user, dto, file);
  }

  // async saveFile() {
  //   const result = await this.profileService.saveFile(file);

  //   return {
  //     url: result.secure_url,
  //     publicId: result.public_id,
  //   };
  // }
}
