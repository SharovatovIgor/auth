import { Module } from '@nestjs/common';

import { RedisProvider } from './redis.provider';
import { RedisService } from './redis.service';

@Module({
  imports: [],
  providers: [RedisProvider, RedisService],
  exports: [RedisService, RedisProvider],
})
export class RedisModule {}
