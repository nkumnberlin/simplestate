import { shallowEqual } from 'shallow-equal';

export type Store<T> = {
  key: string;
  value: T;
};
type StoreListener = () => void;

type StoreManager<T> = {
  setStore: (newStore: Store<T>) => void;
  getSnapshot: () => Store<T>;
  subscribe: (listener: StoreListener) => () => void;
};

function StoreManagerImpl<T>(initialStore: Store<T>): StoreManager<T> {
  if (storeManagerCache.has(initialStore.key)) {
    return storeManagerCache.get(initialStore.key)!;
  }
  const storeUpdatedListeners = new Set<() => void>();
  let store: Store<T> = initialStore;
  console.log('__________ store', store.value, '___', initialStore);

  const setStore = (newStore: Store<T>) => {
    if (shallowEqual(newStore, store)) {
      console.log('is equal', newStore, '_ old ', store);
      return getSnapshot();
    }
    store = newStore;
    console.log('inform subs');
    storeUpdatedListeners.forEach((listener) => listener());
  };
  const getSnapshot = () => store;

  const subscribe = (listener: StoreListener) => {
    storeUpdatedListeners.add(listener);
    return () => {
      storeUpdatedListeners.delete(listener);
    };
  };
  const storeManager = {
    getSnapshot,
    setStore,
    subscribe,
  };

  storeManagerCache.set(initialStore.key, storeManager);
  return storeManager;
}

const storeManagerCache = new Map<string, StoreManager<any>>();

const store = (initialStore: Store<any>) => {
  return StoreManagerImpl(initialStore);
};

export { store };
