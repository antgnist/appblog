import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from 'entities/counter/model/counter.slice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
