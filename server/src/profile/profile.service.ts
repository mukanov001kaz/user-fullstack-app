import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile-entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user-entity';
import { ProfileDto } from './dto/profile-dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly userService: UserService,
  ) {}

  async getAllProfile() {
    return this.profileRepository.find();
  }

  async createProfile(
    user: UserEntity,
    dto: ProfileDto,
  ): Promise<ProfileEntity> {
    const userData = await this.userService.findById(user.id);

    if (!userData) {
      throw new NotFoundException('Пользователь не найден');
    }

    const userProfile = this.profileRepository.create({
      ...dto,
      user: userData,
    });

    return await this.profileRepository.save(userProfile);
  }
}
