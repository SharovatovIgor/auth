import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entyties/user.entity';
import { CreateUserDto } from './types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });    
    delete user?.password;
    return user;
  }

  async findById (id: number) {
    const user =  await this.userRepository.findOne({
      where: {
        id,
      },
    });
    delete user.password;
    return user;
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  updateUser(id: number, updateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
