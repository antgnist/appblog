import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/store/configureStore';

const API_BASE_URL = 'https://blog.kata.academy/api/';

export interface IUserResponse {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}

export interface ErrorResponse {
  errors: { message: string; error: unknown };
}

interface IUserRequestSignUp {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

interface IUserRequestSignIn {
  user: {
    email: string;
    password: string;
  };
}

interface IUserRequestUpdateUser {
  user: {
    email: string;
    password: string | undefined;
    username: string;
    bio?: string;
    image: string;
  };
}

export const userApi = createApi({
  reducerPath: 'userApi',
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
  endpoints: (builder) => ({
    signUp: builder.mutation<IUserResponse, IUserRequestSignUp>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),
    signIn: builder.mutation<IUserResponse, IUserRequestSignIn>({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation<IUserResponse, IUserRequestUpdateUser>({
      query: (data) => ({
        url: '/user',
        method: 'PUT',
        body: data,
      }),
    }),
    getCurrentUser: builder.query<IUserResponse, void>({
      query: () => `/user`,
      // transformErrorResponse: (error) => {
      //   const message =
      //     error.status === 404 ? 'Not found' : 'Something went wrong';
      //   return { test: message } as ErrorResponse;
      // },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} = userApi;
