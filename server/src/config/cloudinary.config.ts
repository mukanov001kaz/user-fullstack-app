import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export type CloudinaryConfig = {
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: number;
  CLOUDINARY_API_SECRET: string;
};

export function cloudinaryConfig(
  configService: ConfigService<CloudinaryConfig>,
) {
  return cloudinary.config({
    cloud_name: configService.getOrThrow('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.getOrThrow('CLOUDINARY_API_KEY'),
    api_secret: configService.getOrThrow('CLOUDINARY_API_SECRET'),
  });
}
