import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/users/dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email = '', password = '' } = loginDto;
    const user = await this.usersService.findOne(email);

    if (!user || !(await bcrypt.compare(password, user.password ?? ''))) {
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_CREDENTIALS'));
    }

    const payload = { sub: user.userId, email: user.email };

    return plainToInstance(UserResponseDto, {
      email: user.email,
      username: user.username,
      bio: user.bio,
      image: user.image,
      access_token: await this.jwtService.signAsync(payload),
    });
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const user = await this.usersService.findOne(email);
    if (user) {
      throw new BadRequestException(
        this.i18n.t('auth.EMAIL_ALREADY_REGISTERED'),
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await this.usersService.createUser(
      email,
      username,
      hashedPassword,
    );
    const payload = { sub: createdUser.userId, email: createdUser.email };

    return plainToInstance(UserResponseDto, {
      email: createdUser.email,
      username: createdUser.username,
      bio: createdUser.bio,
      image: createdUser.image,
      access_token: await this.jwtService.signAsync(payload),
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user || !(await bcrypt.compare(password, user.password ?? ''))) {
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_CREDENTIALS'));
    }

    const { password: _password, ...result } = user;
    return result;
  }
}
