import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from '../entyties/user.entity';
import { Company } from '../entyties/company.entity';
import { Post } from '../entyties/post.entity';
import { Comment } from '../entyties/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([Event]),
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Comment]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
