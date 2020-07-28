import {BindingKey} from '@loopback/core';
import {RedisPubSubComponent} from './component';

export namespace RedisPubSubBindings {
  export const COMPONENT = BindingKey.create<RedisPubSubComponent>(
    'components.RedisPubSubComponent',
  );

  export const REDIS_PUBSUB_NAMESPACE = 'redis.pubsub';

  export const REDIS_CLIENT_PROVIDER = BindingKey.create(
    'redis.client.provider',
  );
}

export namespace RedisPubSubOptionsKeyBindings {
  export const OPTIONS = 'options';

  export const BATCH = 'batch';

  export const BATCH_SIZE = 'batch.size';

  export const QUEUE_URL = 'queue.url';

  export const NAMESPACE = 'namespace';
}
