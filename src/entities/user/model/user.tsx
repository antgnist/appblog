import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store/configureStore';

interface UserState {
  loggedIn: boolean;
  username: string;
  email: string;
  bio: string;
  image: string;
  token: string;
}

const initialState: UserState = {
  loggedIn: false,
  username: '',
  email: '',
  token: '',
  bio: '',
  image: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
      state.image = action.payload.image;
      state.token = action.payload.token;
    },

    // localLogin: (state, action) => {
    //   state.loggedIn = true;
    //   state.username = action.payload.username;
    //   state.email = action.payload.email;
    //   state.bio = action.payload.bio;
    //   state.image = action.payload.image;
    //   state.token = action.payload.token;
    // },

    logout: (state) => {
      state.loggedIn = false;
      state.username = '';
      state.email = '';
      state.bio = '';
      state.image = '';
      state.token = '';
    },
  },
});

const { actions, reducer } = userSlice;
export const { login, logout } = actions;
export const selectUser = (state: RootState) => state.user;

export { reducer as usersReducer };
