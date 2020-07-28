import {Application, Binding, BoundValue} from '@loopback/core';
import {RedisClient} from 'redis';
import {RedisPubSubBindings, RedisPubSubOptionsKeyBindings} from './keys';
import {RedisMessage} from './types';

export class RedisSubscriber {
  redisSubscribers: Readonly<Binding<BoundValue>>[];

  constructor(private app: Application, private subscriberClient: RedisClient) {
    this.redisSubscribers = this.app.findByTag({
      [RedisPubSubOptionsKeyBindings.NAMESPACE]:
        RedisPubSubBindings.REDIS_PUBSUB_NAMESPACE,
    });
  }

  start() {
    this.redisSubscribers.map(
      async (redisSubscriberBinding: Readonly<Binding>) => {
        const redisSubscriberOptions =
          redisSubscriberBinding.tagMap[RedisPubSubOptionsKeyBindings.OPTIONS];
        const {channel} = redisSubscriberOptions;
        const handlerFn: Function | undefined = await this.app.get(
          redisSubscriberBinding.key,
        );
        const handler = (message: RedisMessage | Error) =>
          handlerFn?.({message});
        this.subscriberClient.on('message', (ch, message) => {
          if (ch === channel) {
            let jsonmsg = null;
            try {
              jsonmsg = JSON.parse(message);
            } catch (ex) {
              handler(ex);
            }
            return handler(jsonmsg);
          }
        });
        this.subscriberClient.subscribe(channel);
      },
    );
  }
}
