import {
  createSlice,
  // SerializedError,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store/configureStore';

import { IArticle } from 'shared/interfaces';

interface ArticlesState {
  entities: IArticle[];
  currentArticle: IArticle | null;
  articlesCount: number;
  articlesPage: number;
  likes: {
    [id: string]: {
      isLiked: boolean;
      likesCount: number;
    };
  } | null;
  // error: Error | null | string | SerializedError;
}

interface LikesPayload {
  payload: {
    id: string;
    isFavorited: boolean;
    favoritesCount: number;
  };
}

const initialState: ArticlesState = {
  entities: [],
  currentArticle: null,
  articlesCount: 0,
  articlesPage: 1,
  likes: null,
  // error: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeArticlesPage(state, action) {
      state.articlesPage = action.payload;
    },
    setArticle(state, action) {
      state.currentArticle = action.payload;
    },
    setArticlesList(state, action) {
      state.entities = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    updateLikes(state, action: LikesPayload) {
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload.id]: {
            isLiked: action.payload.isFavorited,
            likesCount: action.payload.favoritesCount,
          },
        },
      };
    },
    clearLikes(state) {
      state.likes = {};
    },
    setLike(state, action) {
      if (state.likes === null) state.likes = {};
      const counter = state.likes[action.payload]?.likesCount
        ? state.likes[action.payload].likesCount + 1
        : 1;
      state.likes[action.payload] = { isLiked: true, likesCount: counter };
    },
    deleteLike(state, action) {
      if (state.likes === null) state.likes = {};
      state.likes[action.payload] = state.likes[action.payload]
        ? {
            isLiked: false,
            likesCount: state.likes[action.payload].likesCount - 1,
          }
        : { isLiked: false, likesCount: 0 };
    },
  },
  extraReducers: {},
});

const { actions, reducer } = articlesSlice;
export const {
  setArticle,
  setArticlesList,
  changeArticlesPage,
  updateLikes,
  clearLikes,
  setLike,
  deleteLike,
} = actions;
export const selectArticles = (state: RootState) => state.articles;
export { reducer as articlesReducer };
