type IActions = { type: string; payload?: number };

const counterReducer = (counter: number = 0, action: IActions) => {
  switch (action.type) {
    case 'COUNTER_INCREMENT':
      return counter + 1;
    case 'COUNTER_DECREMENT':
      return counter - 1;
    default:
      return counter;
  }
};

export default counterReducer;

export const increment = () => ({ type: 'COUNTER_INCREMENT' });

export const decrement = () => ({ type: 'COUNTER_DECREMENT' });
