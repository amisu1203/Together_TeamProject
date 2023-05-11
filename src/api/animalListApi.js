// axios 요청이 들어가는 모든 모듈
import axios from "axios";
import { Cookies } from "react-cookie";
import { login } from "../redux/modules/auth";
import { useDispatch } from "react-redux";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  responseType: "json",
});

const cookies = new Cookies();

// 회원가입
const handleSignUp = async (newUser) => {
  try {
    const response = await axiosInstance.post("/api/signup", newUser, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 로그인 요청
const handleLogin = async (user) => {
  try {
    const response = await axiosInstance.post("api/login", user);
    // 로그인 성공한 경우
    if (response.status === 200) {
      const { access_key, refresh_key } = response.headers;

      // Access Token 쿠키 생성 및 저장
      cookies.set("ACCESS_KEY", access_key, { path: "/" });

      // Refresh Token 쿠키 생성 및 저장
      cookies.set("REFRESH_KEY", refresh_key, { path: "/" });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { handleLogin, handleSignUp };

// const handleLogin = async () => {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/login`, {
//       username: id,
//       password,
//     });

//     // 로그인 성공한 경우
//     if (response.status === 200) {
//       const { accessToken, refreshToken } = response.data;

//       // Access Token 쿠키 생성 및 저장
//       cookies.set("ACCESS_KEY", accessToken, { path: "/" });

//       // Refresh Token 쿠키 생성 및 저장
//       cookies.set("REFRESH_KEY", refreshToken, { path: "/" });

//       // 로그인 액션 크리에이터를 호출
//       dispatch(login(response.data));
//       // 페이지 이동
//       navigate("/");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
