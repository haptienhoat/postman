import * as dotenv from 'dotenv';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RefreshModule } from '../refresh-token/refresh-token.module';
import { RoleModule } from './../role/role.module';
import { UserModule } from '../user/user.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    RefreshModule,
    PassportModule,
    RoleModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_LIFE },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}