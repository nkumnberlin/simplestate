import { useMemo, useSyncExternalStore } from 'react';
import { Store, store } from './StateManager.ts';

type StateHookProp = Store<any>;
function useSimpleState(_store: StateHookProp) {
  const CreatedStore = useMemo(() => {
    console.log('ok wie oft?', _store);
    return store(_store);
  }, [_store]);

  const state = useSyncExternalStore(CreatedStore.subscribe, CreatedStore.getSnapshot);
  console.log('current state', state);
  return [
    state.value,
    (props: any) => {
      const consumerStore = {
        key: _store.key,
        value: props,
      };
      console.log('props ', props, '- ', state, '__ consumer ', consumerStore);
      return CreatedStore.setStore(consumerStore);
    },
  ];
}

export default useSimpleState;
