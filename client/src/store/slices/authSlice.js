import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      console.log(action.payload.token);
      state.token = action.payload.token;
      localStorage.setItem('token', JSON.stringify(action.payload.token))
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token')
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;