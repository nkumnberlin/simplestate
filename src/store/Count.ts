import { createMini } from '../simplestate/StateManager.ts';

const CountMiniState = createMini('key', {
  count: 0,
});

export default CountMiniState;
