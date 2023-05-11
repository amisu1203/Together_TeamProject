import axios from "axios";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/modules/auth";
import { handleLogin } from "../api/animalListApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("인증 안됨");
  const dispatch = useDispatch();

  // 주소 처리하는 부분 바꾸기
  const BASE_URL = "http://3.37.61.10:8080";
  const cookies = new Cookies();

  // 쿼리 관련 코드
  const { mutate: mutateHandleLogin } = useMutation(handleLogin);
  const { isLoading, isError, data, error } = useQuery("loginPost", handleLogin, {
    enabled: false,
  });

  // 로그인 했을 때
  const handleLoginBtnClick = () => {
    const user = {
      username: id,
      password,
    };
    mutateHandleLogin(user, {
      onSuccess: () => {
        alert("로그인이 완료되었습니다!");
        dispatch(login(user));
        navigate("/");
      },
      onError: (error) => {
        !error.response.data.message ? alert(`${error.response.data}`) : alert(`${error.response.data.message}`);
      },
    });
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
      <button onClick={handleLoginBtnClick}>로그인하기</button>
    </div>
  );
};

export default LoginPage;
