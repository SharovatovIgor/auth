import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateUserDto, UserCreds } from './user/types';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  async signin(user: CreateUserDto) {
    return await this.authService.signin(user);
  }

  async signup(user: UserCreds) {
    return await this.authService.signup(user);
  }


  async whoIam(id: number) {
    return await this.authService.whoIam(id);
  }

  async refresh (refresh: string) {
    return await this.authService.refresh(refresh);
  }

  getHello(): string {
    return 'Hello World';
  }
}
