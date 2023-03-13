import { configureStore } from '@reduxjs/toolkit';

import { IStateGlobal } from 'shared/interfaces';
// import loggerMiddleware from './middlewares/loggerMiddleware';
// import monitorReducersEnhancer from './enhancers/monitorReducers';
import rootReducer from './rootReducer';

const configureAppStore = (preloadedState?: IStateGlobal) => {
  const store = configureStore({
    reducer: rootReducer,
    // middleware: [loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    // enhancers: [monitorReducersEnhancer],
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }

  return store;
};

const store = configureAppStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
