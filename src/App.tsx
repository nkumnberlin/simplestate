import './App.css';
import A from './components/A.tsx';
import B from './components/B.tsx';
import { useSyncExternalStore } from 'react';
import { StoreManagerImpl } from './simplestate/StateManager.ts';
import CountMiniState from './store/Count.ts';

function App() {
  const todos = useSyncExternalStore(StoreManagerImpl.onStoreUpdated, StoreManagerImpl.getStore);
  const todo = todos.get(CountMiniState);
  console.log(' todos', todos);
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button type={'button'} onClick={() => StoreManagerImpl.updateStore('test', { count: todo?.value.count + 1 })}>
          count is: {todo?.value.count}
        </button>
        <A />
        <B />
      </div>
    </>
  );
}

export default App;
//(onStoreChange: () => void) => () => void
