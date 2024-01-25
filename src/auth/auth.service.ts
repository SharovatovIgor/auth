import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { RedisService } from '../redis/redis.service';
import { CreateUserDto, UserCreds } from '../user/types';
import { isVerify, sign } from '../helpers/jwt.helper';
import { User } from '../entyties/user.entity';
import { AlredyExist } from '../helpers/customErrors';
import { ERROR_MESSAGE } from '../helpers/errorMessage';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject('REDIS_CLIENT') private redisService: RedisService,
  ) {}

  async signin(user: CreateUserDto) {
    const oldUser = await this.userService.findByEmail(user.email);
    if (oldUser) {
      throw new AlredyExist(ERROR_MESSAGE.USER_ALREDY_EXIST);
    }
    const newUser = await this.userService.createUser(user);
    delete newUser.password;
    const refresh = sign(newUser, process.env.SECRET);
    const token = sign(newUser, refresh);
    return { token, refresh };
  }

  async signup(creds: UserCreds) {
    const user = await this.userService.findByEmail(creds.email);
    if (user) {
      if (isVerify(user.password, creds.password)) {
        const refresh = sign(user, process.env.SECRET);
        const token = sign(user, refresh);
        return { token, refresh };
      }
      throw new ForbiddenException()
    }
  }

  async whoIam(id: number): Promise<User> {
    return await this.userService.findById(id);
  }
  async refresh(refresh: string) {
    const { data: user } = jwt.verify(refresh, process.env.SECRET)

    console.log(user);
    if (user) {
      const newRefresh = sign(user, process.env.SECRET);
      const token = sign(user, refresh);
      return { token, newRefresh };
    }
    throw new ForbiddenException();
  }
}
