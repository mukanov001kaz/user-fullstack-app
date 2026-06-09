import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user-entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(private dataSource: DataSource) {}
  async getUserRegistrations(): Promise<UserEntity> {
    const result = await this.dataSource.query<UserEntity>(
      `SELECT COUNT(*) as count FROM "User"`,
    );
    return result;
  }
}
