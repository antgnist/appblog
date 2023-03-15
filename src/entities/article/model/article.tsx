import {
  createSlice,
  // SerializedError,
} from '@reduxjs/toolkit';

import { IArticle } from 'shared/interfaces';

interface ArticlesState {
  entities: IArticle[];
  currentArticle: IArticle | null;
  articlesCount: number;
  // articlesPage: number;
  // error: Error | null | string | SerializedError;
}

const initialState: ArticlesState = {
  entities: [],
  currentArticle: null,
  articlesCount: 0,
  // articlesPage: 1,
  // error: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    // changeArticlesPage(state, action) {
    //   state.articlesPage = action.payload;
    // },
    setArticle(state, action) {
      state.currentArticle = action.payload;
    },
    setArticlesList(state, action) {
      state.entities = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = articlesSlice;
export const { setArticle, setArticlesList } = actions;
export { reducer as articlesReducer };
