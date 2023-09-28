import { useSyncExternalStore } from 'react';
import { store } from '../simplestate/StateManager.ts';

function B() {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return <p>count is {state.value.count}</p>;
}

export default B;
