import { Body, Controller, Post } from '@nestjs/common';

import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}
    @Post()
    async create(@Body() data) {
        return await this.roleService.create(data)
    }
}