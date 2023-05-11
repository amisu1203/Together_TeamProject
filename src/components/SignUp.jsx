import React, { useEffect, useRef, useState } from "react";
import useInput from "../hooks/useInput";
import { useQuery } from "react-query";
import { signUp } from "../api/signUp";

const SignUp = () => {
  const [id, handleChangeId, setId, idRef] = useInput();
  const [password, handleChangePassword, setPassword, passwordRef] = useInput();
  const [passwordCheck, handleChangePasswordCheck, setPasswordCheck, passwordCheckRef] = useInput();
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // 쿼리 관련 코드
  const { isLoading, isError, data, mutate } = useQuery("signUpPost", signUp, {
    enabled: false, // 이 플래그가 설정된 경우 쿼리가 자동으로 실행되지 않음
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
    const newUser = {
      id,
      password,
      isAdmin,
      adminToken: isAdmin ? "AAABnvxRVklrnYxKZ0aHgTBcXukeZygoC" : null,
    };
    console.log(newUser);
    // mutate 함수를 사용하여 쿼리 실행
    mutate(newUser);
  };

  return (
    <div>
      <div>
        <button onClick={handleGeneralClick}>일반 회원 가입</button>
        <button onClick={handleAdminClick}>관리자 가입</button>
      </div>
      {!!isAdmin ? (
        <div>
          <p>관리자 가입 전용입니다.</p>
          <form>
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
            <button onClick={handleSignUpBtnClick}>회원가입</button>
          </form>
        </div>
      ) : (
        <>
          <form>
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
            <button onClick={handleSignUpBtnClick}>회원가입</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignUp;
