import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n/dist/utils';

export class LoginDto {
  @IsNotEmpty({ message: i18nValidationMessage('auth.EMAIL_EMPTY') })
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string | undefined;

  @MinLength(8, {
    message: i18nValidationMessage('auth.PASSWORD_LENGTH_ERROR'),
  })
  @IsNotEmpty({ message: i18nValidationMessage('auth.PASSWORD_EMPTY') })
  @ApiProperty({ description: 'User password', example: 'password123' })
  password: string | undefined;
}
