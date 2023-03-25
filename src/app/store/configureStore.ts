import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { articlesApi } from 'entities/article/model/articlesApi';
import { userApi } from 'entities/user/model/usersApi';
import { IStateGlobal } from 'shared/interfaces';
// import loggerMiddleware from './middlewares/loggerMiddleware';
// import monitorReducersEnhancer from './enhancers/monitorReducers';
// import rootReducer from './rootReducer';
import { articlesReducer, counterReducer, usersReducer } from './rootReducer';

const configureAppStore = (preloadedState?: IStateGlobal) => {
  const store = configureStore({
    reducer: {
      [articlesApi.reducerPath]: articlesApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      articles: articlesReducer,
      counter: counterReducer,
      user: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(articlesApi.middleware, userApi.middleware),
    preloadedState,
    // enhancers: [monitorReducersEnhancer],
  });

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  // }
  setupListeners(store.dispatch);

  return store;
};

const store = configureAppStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
