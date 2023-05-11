// axios 요청이 들어가는 모든 모듈
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  responseType: "json",
});

// 회원가입
const signUp = async (newUser) => {
  try {
    const response = await axiosInstance.post("/api/signup", newUser, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("여기서", error.response.data);
    throw error; // 에러를 다시 던집니다.
  }
};

export { signUp };
