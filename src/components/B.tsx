import useSimpleState from '../simplestate/StateHook.ts';
import { countStore } from '../simplestate/Store.ts';

function B() {
  const [state, setStore] = useSimpleState(countStore);
  console.log('rerender in B', state);
  return <p>count is {state.count}</p>;
}

export default B;
