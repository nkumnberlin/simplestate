import './App.css';
import A from './components/A.tsx';
import B from './components/B.tsx';
import { store } from './simplestate/StateManager.ts';
import { useSyncExternalStore } from 'react';

function App() {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          type={'button'}
          onClick={() =>
            store.setStore({
              key: 'test',
              value: {
                count: state.value.count + 1,
              },
            })
          }
        >
          count is: ....
        </button>
        <A />
      </div>
      <B />
    </>
  );
}
export default App;
