import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/store/configureStore';
import { IArticle } from 'shared/interfaces';

const API_BASE_URL = 'https://blog.kata.academy/api/';

interface IArticleResponse {
  article: IArticle;
}

interface IArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}

interface IArticleRequestAdding {}

interface IArticleRequestUpdate {
  slug: string;
  data: any;
}

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).user;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Articles', 'Article'],
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesResponse, number | void>({
      query: (page = 1) => {
        const offset = page === 1 || page === undefined ? 0 : (page - 1) * 20;
        return `/articles?offset=${offset}&limit=20`;
      },
      // forceRefetch() {
      //   return true;
      // },
      providesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    getArticleBySlug: builder.query<IArticleResponse, string>({
      query: (slug) => `/articles/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Article', id: slug }],
      // forceRefetch() {
      //   return true;
      // },
    }),
    addArticle: builder.mutation<IArticleResponse, IArticleRequestAdding>({
      query: (data) => ({
        url: '/articles',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    updateArticle: builder.mutation<IArticleResponse, IArticleRequestUpdate>({
      query: ({ data, slug }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Articles', id: 'LIST' },
        { type: 'Article', id: slug },
      ],
    }),
    deleteArticle: builder.mutation<IArticleResponse, string>({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Articles', id: 'LIST' }],
    }),
    favoriteArticle: builder.mutation<IArticleResponse, IArticleRequestAdding>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
    }),
    unfavoriteArticle: builder.mutation<
      IArticleResponse,
      IArticleRequestAdding
    >({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articlesApi;
