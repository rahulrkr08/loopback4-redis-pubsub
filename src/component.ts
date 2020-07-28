import {BindingScope, Component, Constructor, ContextTags, extensionPoint, LifeCycleObserver, ServiceOrProviderClass} from '@loopback/core';
import {RedisPubSubBindings} from './keys';
import {RedisPubSubObserver} from './redis-pubsub.observer';
import {RedisPublisherClientService, RedisSubscriberClientService} from './services';
import {REDIS_PUBSUB_EXTENSION} from './types';

@extensionPoint(REDIS_PUBSUB_EXTENSION, {
  tags: {[ContextTags.KEY]: RedisPubSubBindings.COMPONENT},
  scope: BindingScope.SINGLETON,
})
export class RedisPubSubComponent implements Component {
  lifeCycleObservers: Constructor<LifeCycleObserver>[] = [RedisPubSubObserver];
  services: ServiceOrProviderClass[] = [
    RedisPublisherClientService,
    RedisSubscriberClientService,
  ];
  constructor() {}
}
