import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
    
export class RegisterDto {

    @IsNotEmpty({message: i18nValidationMessage('auth.USER_NAME_EMPTY')})
    username!: string ;

    @IsEmail({}, {message: i18nValidationMessage('auth.EMAIL_INVALID')})
    @IsNotEmpty({message: i18nValidationMessage('auth.EMAIL_EMPTY')})
    email!: string ;

    @MinLength(8, {message: i18nValidationMessage('auth.PASSWORD_LENGTH_ERROR')})
    @IsNotEmpty({message: i18nValidationMessage('auth.PASSWORD_NOT_EMPTY')})
    password!: string ;

}