import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }
    async create(data, userId) {
        data.userId = userId
        return await this.productRepository.save(data)
    }

    async find(query, userId) {
        const productQuery = this.productRepository.createQueryBuilder('product')
            .where(`product.userId = '${userId}'`)
        if (query.search) {
            productQuery.andWhere(`product.name LIKE '%${query.search}%'`)
        }
        const list = await productQuery.getMany()
        const total = await productQuery.getCount()
        return {
            total,
            list
        }
    }

    async update(id, data, userId) {
        const product = await this.productRepository.findOne({
            where: {
                id
            }
        })
        if (product) {
            if (product.userId === userId) {
                return await this.productRepository.update(id, data)
            } else {
                throw new ForbiddenException('Forbidden')
            }
        } else {
            throw new NotFoundException('Product not found')
        }
    }

    async delete(id, userId) {
        const product = await this.productRepository.findOne({
            where: {
                id
            }
        })
        if (product) {
            if (product.userId === userId) {
                return await this.productRepository.delete(id)
            } else {
                throw new ForbiddenException('Forbidden')
            }
        } else {
            throw new NotFoundException('Product not found')
        }
    }
}