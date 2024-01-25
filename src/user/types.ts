import { Point } from 'typeorm';
import { Company } from '../entyties/company.entity';
import { Post } from '../entyties/post.entity';
import { User } from '../entyties/user.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOW = 'UNKNOW',
}

export interface CreateUser {
  name: string;
  lastname: string;
  birthday: Date;
  gender: Gender;
  lastWorkPlace: string;
  education: string;
  specific: string;
  location: number[] | Point;
  ahubLink: string;
  phone: string;
  language: string;
  email: string;
  aboutMe: string;
  password: string;
  company?: Company;
  companyId?: number;
  post?: Post[];
  comment?: Comment[];
  event?: Event[];
}

export type CreateUserDto = Omit<Omit<User, 'id'>, 'updateDates'>;

export type UserCreds = {
  email: string;
  password: string;
};
