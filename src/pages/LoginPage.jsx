import axios from "axios";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
// import { getAnimals } from "../api/animal";
import { useDispatch } from "react-redux";
import { login } from "../redux/modules/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("인증 안됨");
  const dispatch = useDispatch();
  const BASE_URL = "http://3.37.61.10";

  const cookies = new Cookies();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        {
          userName: id,
          password,
        },
        { withCredentials: true }
      );

      // 로그인 성공한 경우
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        // Access Token 쿠키 생성 및 저장
        cookies.set("ACCESS_KEY", accessToken, { path: "/" });

        // Refresh Token 쿠키 생성 및 저장
        cookies.set("REFRESH_KEY", refreshToken, { path: "/" });

        // 로그인 액션 크리에이터를 호출
        dispatch(login(response.data));
        // 페이지 이동
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>SignUpPage</div>
      <h3>로그인으로 등록된 회원 인증/ 인증 성공시 쿠키에 accessToken</h3>
      <div>
        <div>ID:</div>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <div>
        <div>pw : </div>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>로그인하기</button>
    </div>
  );
};

export default LoginPage;
