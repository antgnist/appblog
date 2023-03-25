import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface IStateGlobal {}

export interface IArticle {
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

export interface IResponseServUser {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}
export interface IErrorServ {
  data: {
    errors: {};
  };
  status: number;
}

export type IResponseSuccessUser = { data: IResponseServUser };
export type IResponseSuccessArticle = { data: { article: IArticle } };
export type IResponseError = { error: FetchBaseQueryError | SerializedError };
