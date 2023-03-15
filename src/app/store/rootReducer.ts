import { combineReducers } from '@reduxjs/toolkit';

import { articlesReducer } from 'entities/article/model/article';
import counterReducer from 'entities/counter/model/counter.slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  articles: articlesReducer,
});

export default rootReducer;

export { articlesReducer, counterReducer };
