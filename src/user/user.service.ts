import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entyties/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './types';
// import { Company } from '../entyties/company.entity';
// import { Post } from '../entyties/post.entity';
// import { Comment } from '../entyties/comment.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @InjectRepository(Company)
    // private readonly companyRepository: Repository<Company>,
    // @InjectRepository(Event) private readonly evetRepository: Repository<Event>,
    // @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    // @InjectRepository(Comment)
    // private readonly commentRepository: Repository<Comment>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      console.log('createUser', user);
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
