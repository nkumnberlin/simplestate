import './App.css';
import A from './components/A.tsx';
import B from './components/B.tsx';
import { useSyncExternalStore } from 'react';
import { StoreManagerImpl } from './simplestate/StateManager.ts';

function App() {
  const todos = useSyncExternalStore(StoreManagerImpl.onStoreUpdated, StoreManagerImpl.getSnapshot);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <A />
        <B />
      </div>
    </>
  );
}

export default App;
