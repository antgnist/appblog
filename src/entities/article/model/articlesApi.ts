import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IArticle } from 'shared/interfaces';

const API_BASE_URL = 'https://blog.kata.academy/api/';

interface IArticleResponse {
  article: IArticle;
}

interface IArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesResponse, number | void>({
      query: (page = 1) => {
        const offset = page === 1 || page === undefined ? 0 : (page - 1) * 20;
        return `/articles?offset=${offset}&limit=20`;
      },
    }),
    getArticleBySlug: builder.query<IArticleResponse, string>({
      query: (slug) => `/articles/${slug}`,
      //   transformResponse: (response: IArticleResponse) => response.article,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleBySlugQuery } = articlesApi;
