import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import * as actions from '../model/counter.slice';

function Counter() {
  const num = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  const { increment, decrement } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  return (
    <div>
      <div>Счётчик: {num}</div>
      <button
        style={{ backgroundColor: 'blue', padding: '10px' }}
        type="button"
        onClick={increment}
      >
        +
      </button>
      <button
        style={{ backgroundColor: 'red', padding: '10px' }}
        type="button"
        onClick={decrement}
      >
        -
      </button>
    </div>
  );
}

export default Counter;
