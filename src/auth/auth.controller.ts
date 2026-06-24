import {
    Controller,
    HttpCode,
    HttpStatus, Post, Body, UseGuards,
    Request, Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterDto } from 'src/dto/register.dto';

@Controller('api/users')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    signUp(@Body() signUpDto: RegisterDto) {
        return this.authService.register(signUpDto);
    }


    @UseGuards(LocalAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        return req.logout();
    }
}
