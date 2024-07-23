import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Token = string | null;

export type AuthState = {
  token: Token;
};

const slice = createSlice({
  name: 'auth',
  initialState: { token: null } as AuthState,
  reducers: {
    setToken: (
      state,
      { payload: { token } }: PayloadAction<{ token: Token }>,
    ) => {
      state.token = token;
    },
  },
});

export const { setToken } = slice.actions;

export default slice.reducer;
