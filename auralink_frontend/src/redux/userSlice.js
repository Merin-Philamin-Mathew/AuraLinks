import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_details: null,
  logged_in: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user_details = {
        username: action.payload.username,
        email: action.payload.email,
        display_name: action.payload.display_name,
        avatar_url: action.payload.avatar_url,
      };
      state.logged_in = true;
    },
    logoutUser: (state) => {
      console.log('User logged out');
      state.user_details = null;
      state.logged_in = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
