import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(data) {
    return await this.roleRepository.save(data)
  }

  async findOne(name) {
    return await this.roleRepository.findOne({
      where: {
        name
      }
    })
  }
}