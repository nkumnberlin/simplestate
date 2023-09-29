import { useMemo, useSyncExternalStore } from 'react';
import { Store, createStore } from './StateManager.ts';

type StateHookProp = Store<any>;
function useSimpleState(_store: StateHookProp) {
  const CreatedStore = useMemo(() => {
    return createStore(_store);
  }, [_store]);

  const state = useSyncExternalStore(CreatedStore.subscribe, CreatedStore.getSnapshot);
  return [
    state.value,
    (props: any) => {
      const consumerStore = {
        key: _store.key,
        value: props,
      };
      return CreatedStore.setStore(consumerStore);
    },
  ];
}

export default useSimpleState;
