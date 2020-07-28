# loopback4-redis-pubsub
This is a loopback-next extension for publishing and subscribing events from Redis.

# Install
```sh
npm install --save loopback4-redis-pubsub
```

# Usage
In order to use this, add `RedisPubSubComponent` component into your LoopBack application, please follow below steps.

### Add component to application.
```ts
// application.ts
import {RestApplication} from '@loopback/rest';
import {RedisPubSubBindings, RedisPubSubComponent, RedisPubSubConfig} from 'loopback4-redis-pubsub';
....

export class RedisPubSubTestApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    ....

    const redisPubSubConfig: RedisPubSubConfig = {
      port: 6379
    }

    this.configure(RedisPubSubBindings.COMPONENT).to(redisPubSubConfig)
    this.component(RedisPubSubComponent)
    ....
  }
}
```

### Subscribing Redis Events
This extension need a provider to subscribe redis event. Providers are decorated with `redisSubscriber`, which will bind to application context, so it can be managed by the `RedisPubSubComponent`.

```ts
import {Provider} from '@loopback/core';
import {RedisPubSubEvent, RedisPubSubReturnVal, redisSubscriber, RedisMessage} from 'loopback4-redis-pubsub';

@redisSubscriber({
  channel: 'test'
})
export class TestRedisPubSubProvider implements Provider<RedisPubSubEvent> {
  constructor() {}

  value() {
    return this.action.bind(this);
  }

  async action(message: RedisMessage): Promise<RedisPubSubReturnVal> {
    console.log(message)
  }
}
```

### Publishing events to redis
This extension exports `RedisPublisherClientService` service, to use as redis publisher client.
```ts
import {service} from '@loopback/core';
import {get} from '@loopback/rest';
import {RedisClient} from 'redis';
import {RedisPublisherClientService} from 'loopback4-redis-pubsub';

export class PingController {
  constructor(
    @service(RedisPublisherClientService) private redisPublisherClient: RedisClient,
  ) {}

  @get('/test')
  test() {
    const message: string = JSON.stringify({test: 'message'});
    this.redisPublisherClient.publish('test', message);
    return {}
  }
}
```
