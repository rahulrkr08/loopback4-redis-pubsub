import {bind, BindingSpec} from '@loopback/core';
import {asRedisSubscriber, RedisPubSubOptions} from './types';

export function redisSubscriber(
  options: RedisPubSubOptions,
  ...specs: BindingSpec[]
) {
  const {channel} = options;
  if (!channel) throw new Error('channel is missing');

  return bind(asRedisSubscriber(options), ...specs);
}
