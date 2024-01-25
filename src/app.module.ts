import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './entyties/user.entity';
import { Post } from './entyties/post.entity';
import { Company } from './entyties/company.entity';
import { Event } from './entyties/event.entity';
import { Comment } from './entyties/comment.entity';

console.log(process.env);


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:  process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      entities: [User, Post, Company, Event, Comment],
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
