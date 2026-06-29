import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(
    email: string,
    username: string,
    hashedPassword: string,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = hashedPassword;
    user.bio = 'I work as a software engineer and I love to code';
    user.image = null;

    return await this.userRepository.save(user);
  }
}
