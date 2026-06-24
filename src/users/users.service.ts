import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {

  private users = [
    {
      userId: 1,
      email: 'trung@example.com',
      password: 'Aa@1234567',
      bio: "I work as a software engineer and I love to code",
      image: null
    },
    {
      userId: 2,
      email: 'alpha@example.com',
      password: 'Aa@123456',
      bio: "I work as a teacher and I love to teach",
      image: null
    },
  ]

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  createUser(email: string, username: string, hashedPassword: string): User {
    const maxId = this.users.reduce((max, user) => (user.userId > max ? user.userId : max), 0);
    const user = {
      userId: maxId + 1,
      email: email,
      username: username,
      password: hashedPassword,
      bio: "I work as a software engineer and I love to code",
      image: null
    }
    this.users.push(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

}
