import { LocalAuthGuard } from './guard/local-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        return this.authService.login(req.user);
    }

    @Post('signup')
    async signup(@Body() data): Promise<any> {
        return this.authService.signup(data);
    }

    @Post('refresh-token')
    async refreshToken(@Request() req): Promise<any> {
        return this.authService.refreshToken(req);
    }
}