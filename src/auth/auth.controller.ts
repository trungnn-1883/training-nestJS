import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterDto } from 'src/users/dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOperation({ summary: 'User registration' })
  @ApiBadRequestResponse({ description: 'Email already registered' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  signUp(@Body() signUpDto: RegisterDto) {
    return this.authService.register(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return await req.logout();
  }
}
