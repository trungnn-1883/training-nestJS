import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private jwtService: JwtService, private readonly i18n: I18nService) { }

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email)
      
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.userId, email: user.email }

        return {
            email: user.email,
            bio: user.bio,
            image: user.image,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(registerDto: RegisterDto) {
         const currentLanguage = I18nContext.current()?.lang ?? 'en';
            
        const { username, email, password } = registerDto;

        const user = await this.usersService.findOne(email);
        if (user) {
            throw new BadRequestException(this.i18n.t('auth.EMAIL_ALREADY_REGISTERED', { lang: currentLanguage }));
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await this.usersService.createUser(email, username, hashedPassword);
         const payload = { sub: newUser.userId, email: newUser.email }
         
        return { 
            email: newUser.email,
            username: newUser.username,
            bio: newUser.bio,
            image: newUser.image,
            access_token: await this.jwtService.signAsync(payload) };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
   
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const { password: _password, ...result } = user;
        return result;
    }

}
