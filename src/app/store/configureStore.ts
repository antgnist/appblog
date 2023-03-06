// import {
//   legacy_createStore as createStore,
//   applyMiddleware,
//   compose,
// } from 'redux';

// import { composeWithDevTools } from 'redux-devtools-extension';

// import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from './middlewares/loggerMiddleware';
// import rootReducer from './reducer/reducer';

// const configureStore = (preloadedState?: IStateGlobal) => {
//   const middlewares = [loggerMiddleware, thunkMiddleware];
//   const middlewareEnhancer = applyMiddleware(...middlewares);

//   const enhancers = [middlewareEnhancer];
//   const composedEnhancers =
//     composeWithDevTools(...enhancers) || compose(...enhancers);

//   const store = createStore(rootReducer, preloadedState, composedEnhancers);

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducer/reducer', () =>
//       store.replaceReducer(rootReducer),
//     );
//   }
//   return store;
// };

// const store = configureStore();
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;

// ---------------with toolkit:

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { IStateGlobal } from 'shared/interfaces/interfaces';
import loggerMiddleware from './middlewares/loggerMiddleware';
// import monitorReducersEnhancer from './enhancers/monitorReducers';
import rootReducer from './rootReducer';

const configureAppStore = (preloadedState?: IStateGlobal) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
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
