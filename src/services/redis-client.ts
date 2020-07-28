import * as redis from 'redis';
import {RedisPubSubConfig} from '../types';

export function redisClient(
  options: RedisPubSubConfig,
): Promise<redis.RedisClient> {
  return new Promise((resolve, reject) => {
    if (!options.host) {
      options.host = '127.0.0.1';
    }

    const client = redis.createClient(options);
    client
      .on('connect', function () {
        resolve(client);
      })
      .on('error', function (error) {
        reject(error);
      });
  });
}
