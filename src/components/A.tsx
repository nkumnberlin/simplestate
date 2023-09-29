import useSimpleState from '../simplestate/StateHook.ts';
import { countStore } from '../simplestate/Store.ts';

function A() {
  const [state, setStore] = useSimpleState(countStore);

  console.log('rerender in A');

  return (
    <button type={'button'} onClick={() => setStore({ count: state.count + 1 })}>
      count is: .... {state.count}
    </button>
  );
}

export default A;
