import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      // 쿠키에 저장된 토큰을 읽어와 auth 정보를 갱신합니다.
      const accessToken = cookies.get("ACCESS_KEY");
      state.accessToken = accessToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      // 로그아웃 시에는 쿠키에서 토큰을 삭제합니다.
      cookies.remove("ACCESS_KEY");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
