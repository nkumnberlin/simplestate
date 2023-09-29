import { Store } from './StateManager.ts';

type CountStore = { count: number };

// extend internal store interface after creation.
export const countStore: Store<CountStore> = {
  key: 'test',
  value: {
    count: 0,
  },
};
