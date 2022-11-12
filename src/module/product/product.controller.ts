import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data, @Req() req) {
        return await this.productService.create(data, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async find(@Query() query, @Req() req) {
        return await this.productService.find(query, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() data, @Param('id') id, @Req() req) {
        return await this.productService.update(id, data, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id, @Req() req) {
        return await this.productService.delete(id, req.user.userId)
    }
}