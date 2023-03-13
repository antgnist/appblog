import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store/configureStore';
import { apiService } from 'shared/services/api-service';

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

interface ArticlesState {
  entities: Article[];
  articlesCount: number;
  articlesPage: number;
  status: 'idle' | 'pending' | 'fulfilled';
  currentRequestId: string | undefined;
  error: Error | null | string | SerializedError;
}

const fetchArticles = createAsyncThunk<
  { articles: Article[]; articlesCount: number },
  number,
  { state: RootState }
>(
  'articles/fetchArticlesStatus',
  async (pageNumber, { getState, requestId }) => {
    const { currentRequestId, status } = getState().articles;
    if (status !== 'pending' || requestId !== currentRequestId) {
      throw new Error('Request canceled!');
    }
    const response = await apiService.getArticles(pageNumber);
    return response;
  },
);

const initialState: ArticlesState = {
  entities: [],
  articlesCount: 0,
  articlesPage: 1,
  status: 'idle',
  currentRequestId: undefined,
  error: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeArticlesPage(state, action) {
      state.articlesPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        if (state.status === 'idle') {
          state.status = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          // state.loading = 'fulfilled';
          state.status = 'idle';
          state.entities = action.payload.articles;
          state.articlesCount = action.payload.articlesCount;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.status = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

const { actions, reducer } = articlesSlice;
export const { changeArticlesPage } = actions;
export { reducer as articlesReducer };
export { fetchArticles };
