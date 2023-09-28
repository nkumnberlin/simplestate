import { useCallback } from 'react';

type Store<T> = {
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
  const storeUpdatedListeners = new Set<() => void>();
  let store: Store<T> = initialStore;

  // const storeFunc = useCallback(() => {
  const setStore = (newStore: Store<T>) => {
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

  return {
    getSnapshot,
    setStore,
    subscribe,
  };
  // }, [store]);
  // return {
  //   ...storeFunc(),
  // };
}

type InitStore = { count: number };

const initialStore: Store<InitStore> = {
  key: 'test',
  value: {
    count: 0,
  },
};
const store = StoreManagerImpl<InitStore>(initialStore);

export { store };
