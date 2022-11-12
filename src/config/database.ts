import { Product } from './../module/product/product.entity';
import { RefreshToken } from './../module/refresh-token/refresh-token.entity';
import { Role } from './../module/role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../module/user/user.entity';

export const configDatabase =
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEME,
        entities: [
            User,
            Role,
            RefreshToken,
            Product
        ],
        synchronize: true,
        logging: true
    })