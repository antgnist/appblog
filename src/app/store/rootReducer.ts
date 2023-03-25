import { combineReducers } from '@reduxjs/toolkit';

import { articlesReducer } from 'entities/article/model/article';
import counterReducer from 'entities/counter/model/counter.slice';
import { usersReducer } from 'entities/user/model/user';

const rootReducer = combineReducers({
  counter: counterReducer,
  articles: articlesReducer,
  user: usersReducer,
});

export default rootReducer;

export { articlesReducer, counterReducer, usersReducer };
