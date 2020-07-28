import {BindingScope, BindingTemplate, NonVoid} from '@loopback/core';
import {ClientOpts, RedisClient} from 'redis';
import {RedisPubSubBindings, RedisPubSubOptionsKeyBindings} from './keys';

export const REDIS_PUBSUB_EXTENSION = 'redis.pubsub.extension';

export interface RedisPubSubConfig extends ClientOpts {}

export interface RedisPubSubOptions {
  channel?: string;
}

export type RedisMessage = {
  [props: string]: string;
};

export function asRedisSubscriber(
  options: RedisPubSubOptions,
): BindingTemplate {
  return binding => {
    binding
      .tag({
        [RedisPubSubOptionsKeyBindings.NAMESPACE]:
          RedisPubSubBindings.REDIS_PUBSUB_NAMESPACE,
        [RedisPubSubOptionsKeyBindings.OPTIONS]: options,
      })
      .inScope(BindingScope.SINGLETON);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RedisPubSubReturnVal = NonVoid | any;

export interface RedisPubSubEvent {
  (message: RedisMessage): Promise<RedisPubSubReturnVal>;
}
export interface RedisPubSubService {
  (message: RedisMessage): Promise<RedisClient>;
}
