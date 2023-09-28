import { createMini } from '../simplestate/StateManager.ts';

const CountMiniState = createMini('test', {
  count: 0,
});

export default CountMiniState;
