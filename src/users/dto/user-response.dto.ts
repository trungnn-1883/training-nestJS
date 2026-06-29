import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string | undefined;

  @ApiProperty({
    description: 'Authentication token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string | undefined;

  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  username: string | undefined;

  @ApiProperty({
    description: 'User biography',
    nullable: true,
    example: 'Software developer and tech enthusiast.',
  })
  bio: string | null | undefined;

  @ApiProperty({
    description: 'User profile image',
    nullable: true,
    example: 'https://example.com/profile.jpg',
  })
  image: string | null | undefined;
}
