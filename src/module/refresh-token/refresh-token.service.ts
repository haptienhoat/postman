import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create(data): Promise<RefreshToken> {
    return await this.refreshTokenRepository.save(data)
  }

  async findOne(id: string): Promise<RefreshToken> {
    return await this.refreshTokenRepository.findOne({
      where: {
        userId: id
      }
    })
  }

  async update(id: string, data): Promise<any> {
    return await this.refreshTokenRepository.update(id, data)
  }
}