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

  const setStore = (newStore: Store<T>) => {
    if (shallowEqual(newStore.value, store.value)) {
      return getSnapshot();
    }
    store = newStore;
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

const createStore = (initialStore: Store<any>) => StoreManagerImpl(initialStore);

export { createStore };
