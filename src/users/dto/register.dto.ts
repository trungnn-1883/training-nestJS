import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RegisterDto {
  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @IsNotEmpty({ message: i18nValidationMessage('auth.USER_NAME_EMPTY') })
  username!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'trung@gmail.com',
  })
  @IsEmail({}, { message: i18nValidationMessage('auth.EMAIL_INVALID') })
  @IsNotEmpty({ message: i18nValidationMessage('auth.EMAIL_EMPTY') })
  email!: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @MinLength(8, {
    message: i18nValidationMessage('auth.PASSWORD_LENGTH_ERROR'),
  })
  @IsNotEmpty({ message: i18nValidationMessage('auth.PASSWORD_EMPTY') })
  password!: string;
}
