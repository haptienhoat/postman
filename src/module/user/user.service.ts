import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data): Promise<User> {
    return await this.userRepository.save(data)
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username
      },
      relations: ['role']
    })
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['role']
    })
  }
}