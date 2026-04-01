import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile-dto';
import { AuthJwtGuards } from 'src/auth/guards/auth-guards';
import { GetParamUser } from 'src/user/decorators/get-user.decorators';
import { UserEntity } from 'src/user/entities/user-entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('all')
  getProfile() {
    return this.profileService.getAllProfile();
  }

  @UseGuards(AuthJwtGuards)
  @Post('create')
  createProfile(@GetParamUser() user: UserEntity, @Body() dto: ProfileDto) {
    return this.profileService.createProfile(user, dto);
  }
}
