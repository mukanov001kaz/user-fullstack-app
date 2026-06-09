import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile-entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user-entity';
import { ProfileDto } from './dto/profile-dto';
import { UserService } from 'src/user/user.service';
import { Express } from 'express';
import { cloudinaryConfig } from 'src/config/cloudinary.config';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async getAllProfile() {
    return this.profileRepository.find();
  }

  async createProfile(
    user: UserEntity,
    dto: ProfileDto,
    file: Express.Multer.File,
  ): Promise<ProfileEntity> {
    const userData = await this.userService.findById(user.id);

    if (!userData) {
      throw new NotFoundException('Пользователь не найден');
    }

    let uploadResult: UploadApiResponse | undefined;

    if (file) {
      uploadResult = await this.saveFile(file);
    }

    const userProfile = this.profileRepository.create({
      ...dto,
      user: userData,
      avatarUrl: uploadResult?.secure_url,
      avatarPublicId: uploadResult?.public_id,
    });

    return await this.profileRepository.save(userProfile);
  }

  saveFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    cloudinaryConfig(this.configService);

    return new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'trakaz',
          },
          (error, result) => {
            if (error) {
              return reject(
                new Error(error.message || 'Cloudinary upload error'),
              );
            }

            if (!result) {
              return reject(new Error('Upload result is undefined'));
            }

            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }
}
