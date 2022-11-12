import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProductModule } from './module/product/product.module';
import { RefreshModule } from './module/refresh-token/refresh-token.module';
import { RoleModule } from './module/role/role.module';
import { UserModule } from './module/user/user.module';
import { configDatabase } from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot(),
    configDatabase,
    UserModule,
    RoleModule,
    RefreshModule,
    AuthModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
