import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLogin: false,
  user: null,
  myProfile: [],
};
export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    authReducer: (state, action) => {
      state.token = action.payload.token;
      state.isLogin = true;
      state.user = action.payload.user;
    },
    isSignout: (state) => {
      state.token = "";
      state.isLogin = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
    profileData: (state, action) => {
      state.myProfile = action.payload;
    },
  },
});

export const { authReducer, isSignout, updateUser, profileData } =
  authSlice.actions;
export default authSlice.reducer;
