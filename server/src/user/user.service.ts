import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user-entity';
import { Repository } from 'typeorm';
import { CreatedUserDto } from './dto/created-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['profile'] });
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async createUser(dto: CreatedUserDto): Promise<CreateUserResponseDto> {
    const { name, email, password } = dto;

    const existengEmail = await this.findByEmail(email);

    if (existengEmail) {
      throw new BadRequestException('Email уже сушествует в методе Create');
    }

    const newPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: newPassword,
    });

    // const newUser = await this.userRepository.save(user);
    await this.userRepository.save(user);

    return {
      // user: newUser,
      message:
        'Пользователь успешно создан для метода Create и записан в базу данных',
    };
  }

  async updateUser(
    id: string,
    dto: CreatedUserDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден в методе Update');
    }

    Object.assign(user, dto);

    await this.userRepository.save(user);

    return {
      message: 'Успешно обновлено для метода Update',
    };
  }

  async deleteuser(id: string): Promise<string> {
    const user = await this.findById(id);

    await this.userRepository.remove(user);

    return 'Пользователь успешно удален';
  }

  async setCurrentRefreshToken(id: string, refreshToken: string) {
    return await this.userRepository.update(id, { refreshToken });
  }

  async removeRefreshToken(id: string) {
    return await this.userRepository.update(id, { refreshToken: null });
  }

  async validate(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден в методе Validate');
    }
    return user;
  }
}
