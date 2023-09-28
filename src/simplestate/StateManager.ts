interface Store {
  name: string;
  value: any;
}

interface StoreManager {
  createStore: (name: string, value: any) => void;
  updateStore: (name: string, value: any) => void;
  getStore: (name: string) => Store | undefined;
  onStoreCreated: (listener: (store: Store) => void) => void;
  onStoreUpdated: (listener: (store: Store) => void) => void;
}

let storeUpdatedListeners: ((store: Store) => void)[] = [];

const stores: Map<string, Store> = new Map();

const StoreManagerImpl: StoreManager = {
  createStore(name: string, value: any) {
    const newStore: Store = { name, value };
    stores.set(name, newStore);
    emitStoreUpdated(newStore);
  },

  updateStore(name: string, value: any) {
    const existingStore = stores.get(name);
    if (existingStore) {
      console.log('check, e,', existingStore);
      existingStore.value = value;
      emitStoreUpdated(existingStore);
    }
  },
  getSnapshot(name: string): Store | undefined {
    return stores.get(name);
  },

  onStoreUpdated: (listener: (store: Store) => void) => {
    console.log('listener updated', listener);
    storeUpdatedListeners.push(listener);
    return () => {
      storeUpdatedListeners = storeUpdatedListeners.filter((l) => l !== listener);
    };
  },
};

function emitStoreUpdated(store: Store) {
  storeUpdatedListeners.forEach((listener) => listener(store));
}

const createMini = (name: string, value: any) => {
  // registrieren, sonst nur getten?
  StoreManagerImpl.createStore(name, value);
  return name;
};

const useSimpleState = (storeName: string) => {
  console.log(storeName);

  // read, write
  // return [StoreManagerImpl.getStore(storeName),]
};

export { createMini, useSimpleState, StoreManagerImpl };
