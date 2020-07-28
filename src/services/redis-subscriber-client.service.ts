import {bind, BindingScope, config, Provider} from '@loopback/core';
import * as redis from 'redis';
import {RedisPubSubBindings} from '../keys';
import {RedisPubSubConfig} from '../types';
import {redisClient} from './redis-client';

@bind({scope: BindingScope.SINGLETON})
export class RedisSubscriberClientService
  implements Provider<redis.RedisClient> {
  constructor(
    @config({fromBinding: RedisPubSubBindings.COMPONENT})
    private options: RedisPubSubConfig,
  ) {}

  value(): Promise<redis.RedisClient> {
    return redisClient(this.options);
  }
}
