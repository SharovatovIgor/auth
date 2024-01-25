import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [UserModule, RedisModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
