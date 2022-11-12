import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { Role } from './enum/role.enum';
import { RoleService } from './../role/role.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
    private roleService: RoleService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const refreshToken = this.jwtService.sign(
      {
        userId: user.id,
        roleId: user.roleId,
        username: user.username,
        role: user.role.name
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
      },
    );

    const token = await this.refreshTokenService.findOne(user.id);

    if (!token) {
      await this.refreshTokenService.create({
        userId: user.id,
        refreshToken,
      });
    } else {
      await this.refreshTokenService.update(
        token.id,
        {
          refreshToken,
          userId: user.id
        }
      );
    }

    const userData = await this.userService.findById(user.id)

    const { password, ...result } = userData

    const data = {
      ...result,
      refreshToken
    }

    return {
      success: true,
      data
    }
  }

  async signup(data): Promise<any> {
    let user = await this.userService.findOne(data.username)
    const role = await this.roleService.findOne(Role.USER)
    if (user) {
      throw new BadRequestException()
    } else {
      data.password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUND))
      data.roleId = role.id
      user = await this.userService.create(data)
      const { password, ...result } = user
      return {
        success: true,
        data: result
      }
    }
  }

  async refreshToken(req): Promise<any> {
    try {
      const refreshToken = req.headers['x-refresh-token'];
      if (!refreshToken) {
        throw new BadRequestException()
      }

      const decoded = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      })

      const payload = {
        userId: decoded.userId,
        roleId: decoded.roleId,
        username: decoded.username,
        role: decoded.role
      };
      const accessToken = await this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      });

      return {
        success: true,
        accessToken
      }
    } catch (err) {
      if (err.message === 'jwt expired') {
        throw new BadRequestException('jwt expired')
      } else if (err.message === 'Bad Request') {
        throw new BadRequestException()
      }
    }
  }
}