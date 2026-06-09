import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreatedUserDto } from './dto/created-user.dto';
import { AuthJwtGuards } from 'src/auth/guards/auth-guards';
import { RolesGuard } from 'src/auth/guards/role-guards';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthJwtGuards, RolesGuard)
  // @Roles('admin')
  @Get('all')
  async findAll() {
    return await this.userService.findAll();
  }

  // @UseGuards(AuthJwtGuards, RolesGuard)
  // @Roles('admin', 'user')
  @Post('create')
  async createdUser(@Body() dto: CreatedUserDto) {
    return await this.userService.createUser(dto);
  }

  @UseGuards(AuthJwtGuards, RolesGuard)
  @Roles('admin', 'user')
  @Put('update/:id')
  async updadteUser(@Param('id') id: string, @Body() dto: CreatedUserDto) {
    return await this.userService.updateUser(id, dto);
  }

  @Delete('delete/:id')
  async deleteuser(@Param('id') id: string) {
    return await this.userService.deleteuser(id);
  }
}
