import React, { useEffect, useRef, useState } from "react";
import useInput from "../hooks/useInput";
import { useMutation, useQuery } from "react-query";
import { handleSignUp } from "../api/animalListApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const [id, handleChangeId, setId, idRef] = useInput();
  const [password, handleChangePassword, setPassword, passwordRef] = useInput();
  const [passwordCheck, handleChangePasswordCheck, setPasswordCheck, passwordCheckRef] = useInput();
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [admin, handleChangeAdmin, setAdmin, adminRef] = useInput();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { mutate: mutateSignUp } = useMutation(handleSignUp);
  // 쿼리 관련 코드
  const { isLoading, isError, data, error } = useQuery("signUpPost", handleSignUp, {
    enabled: false,
  });

  // 입력창 에러 메세지 노출
  useEffect(() => {
    if (id) {
      setUserNameError("");
    }
  }, [id]);
  useEffect(() => {
    if (password) {
      setPasswordError("");
    }
  }, [password]);

  // 로딩 중 일때
  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  // 에러 났을 때
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  // 일반 회원 가입 클릭시
  const handleGeneralClick = () => {
    setIsAdmin((isAdmin) => false);
    setId("");
    setPassword("");
    setPasswordCheck("");
  };

  // 관리자 회원 가입 클릭시
  const handleAdminClick = () => {
    setIsAdmin((isAdmin) => true);
    setId("");
    setPassword("");
    setPasswordCheck("");
  };

  // 회원가입 버튼 클릭시
  const handleSignUpBtnClick = (e) => {
    e.preventDefault();
    if (!id) {
      idRef.current?.focus();
      setUserNameError("아이디를 입력하세요.");
      return;
    }
    if (!password) {
      passwordRef.current?.focus();
      setPasswordError("비밀번호를 입력하세요.");
      return;
    }
    if (!passwordCheck) {
      passwordCheckRef.current?.focus();
      return;
    }
    if (adminRef.current) {
      if (!admin) {
        adminRef.current?.focus();
        return;
      }
    }
    const newUser = {
      username: id,
      password,
      admin: isAdmin,
      adminToken: isAdmin ? admin : null,
    };

    mutateSignUp(newUser, {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다!");
        navigate("/api/login");
      },
      onError: (error) => {
        const message = error.response.data;
        if (message.length > 55) {
          const splited = message.split("구성해주세요.");
          const formattedMsg = splited.join("구성해주세요.\n");
          return alert(`${formattedMsg}`);
        }
        !error.response.data.message ? alert(`${error.response.data}`) : alert(`${error.response.data.message}`);
      },
    });
  };

  return (
    <div>
      <StBoxLoginBtns>
        <StLoginBtn onClick={handleGeneralClick}>일반 회원 가입</StLoginBtn>
        <StLoginBtn onClick={handleAdminClick}>관리자 가입</StLoginBtn>
      </StBoxLoginBtns>
      {!!isAdmin ? (
        <>
          <StBoxSignUp>
            <StTxtForSignUp>관리자 가입</StTxtForSignUp>
            <input ref={idRef} value={id} onChange={handleChangeId} type="text" aria-describedby="nameInputError" placeholder="아이디를 입력하세요." />
            {!!userNameError && (
              <div role="alert" id="nameInputError">
                {userNameError}
              </div>
            )}
            <input
              ref={passwordRef}
              value={password}
              onChange={handleChangePassword}
              type="password"
              aria-describedby="passwordError"
              placeholder="비밀번호를 입력하세요."
            />
            {!!passwordError && (
              <div role="alert" id="passwordError">
                {passwordError}
              </div>
            )}
            <input type="password" ref={passwordCheckRef} value={passwordCheck} onChange={handleChangePasswordCheck} placeholder="비밀번호를 확인하세요." />
            {passwordCheck
              ? passwordCheckRef.current?.value !== passwordRef.current?.value
                ? "비밀번호가 일치하지 않습니다."
                : "비밀번호가 일치합니다."
              : null}
            <input value={admin} onChange={handleChangeAdmin} type="text" ref={adminRef} placeholder="관리자 토큰을 입력하세요."></input>
            <StSingUpBtn onClick={handleSignUpBtnClick}>회원가입</StSingUpBtn>
          </StBoxSignUp>
        </>
      ) : (
        <>
          <StBoxSignUp>
            <StTxtForSignUp>일반 회원 가입</StTxtForSignUp>
            <input ref={idRef} value={id} onChange={handleChangeId} type="text" aria-describedby="nameInputError" placeholder="아이디를 입력하세요." />
            {!!userNameError && (
              <div role="alert" id="nameInputError">
                {userNameError}
              </div>
            )}
            <input
              ref={passwordRef}
              value={password}
              onChange={handleChangePassword}
              type="password"
              aria-describedby="passwordError"
              placeholder="비밀번호를 입력하세요."
            />
            {!!passwordError && (
              <div role="alert" id="passwordError">
                {passwordError}
              </div>
            )}
            <input type="password" ref={passwordCheckRef} value={passwordCheck} onChange={handleChangePasswordCheck} placeholder="비밀번호를 확인하세요." />
            {passwordCheck
              ? passwordCheckRef.current?.value !== passwordRef.current?.value
                ? "비밀번호가 일치하지 않습니다."
                : "비밀번호가 일치합니다."
              : null}
            <StSingUpBtn onClick={handleSignUpBtnClick}>회원가입</StSingUpBtn>
          </StBoxSignUp>
        </>
      )}
    </div>
  );
};

export default SignUp;

const StBoxLoginBtns = styled.div`
  margin-top: 100px;
  margin-bottom: 20px;
`;
const StLoginBtn = styled.button`
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  margin-right: 10px;
`;

const StTxtForSignUp = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const StBoxSignUp = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  min-height: 400px;
  padding: 80px 70px;
  box-sizing: border-box;
  justify-content: space-evenly;
  align-content: center;
  background-color: #edededc7;
  border-radius: 10px;
`;

const StSingUpBtn = styled.button`
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
  background-color: #ededed;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #777777;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  &:hover {
    background-color: #b7ddeb;
  }
`;
