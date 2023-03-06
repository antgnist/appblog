import { Middleware, MiddlewareAPI, Dispatch, Action } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    const result = next(action);
    store.getState();

    // console.log('result = next(action): ', result);
    // console.log('store.getState(): ', store.getState());

    return result;
  };

export default loggerMiddleware;
