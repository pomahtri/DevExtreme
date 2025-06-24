import { each } from '@js/core/utils/iterator';

import { Callback } from './utils/m_callbacks';

class MemorizedCallbacks {
  memory: any[];

  callbacks: Callback;

  constructor() {
    this.memory = [];
    this.callbacks = new Callback();
  }

  add(fn) {
    each(this.memory, (_, item) => fn.apply(fn, item));
    this.callbacks.add(fn);
  }

  remove(fn) {
    this.callbacks.remove(fn);
  }

  fire(...args) {
    this.memory.push(args);
    this.callbacks.fire.apply(this.callbacks, args);
  }
}

export { MemorizedCallbacks };
