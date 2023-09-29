import './App.css';
import A from './components/A.tsx';
import B from './components/B.tsx';

function App() {
  console.log('parent renders');
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <A />
      </div>
      <B />
    </>
  );
}
export default App;
