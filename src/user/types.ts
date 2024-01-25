import { User } from '../entyties/user.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOW = 'UNKNOW',
}

export type CreateUserDto = Omit<Omit<User, 'id'>, 'updateDates'>;

export type UserCreds = {
  email: string;
  password: string;
};
