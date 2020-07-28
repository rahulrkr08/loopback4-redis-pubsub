import {Application, CoreBindings, inject, LifeCycleObserver, service} from '@loopback/core';
import {RedisClient} from 'redis';
import {RedisSubscriber} from './redis-subscriber';
import {RedisPublisherClientService, RedisSubscriberClientService} from './services';

export class RedisPubSubObserver implements LifeCycleObserver {
  redisPubSub: RedisSubscriber;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @service(RedisPublisherClientService)
    private redisPublisherClient: RedisClient,
    @service(RedisSubscriberClientService)
    private redisSubscriberClient: RedisClient,
  ) {
    this.redisPubSub = new RedisSubscriber(
      this.app,
      this.redisSubscriberClient,
    );
  }

  start() {
    this.redisPubSub.start();
  }

  stop() {
    this.redisPublisherClient.end();
    this.redisSubscriberClient.end();
  }
}
