import React, { useEffect, useRef, useState } from "react";
import useInput from "../hooks/useInput";

const SignUpPage = () => {
  const [id, handleChangeId, , idRef] = useInput();
  const [password, handleChangePassword, , passwordRef] = useInput();
  const [passwordCheck, handleChangePasswordCheck, , passwordCheckRef] = useInput();
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);

  // 일반 회원 가입 클릭시
  const handleGeneralClick = () => {
    setIsAdmin((isAdmin) => false);
  };

  // 관리자 회원 가입 클릭시
  const handleAdminClick = () => {
    setIsAdmin((isAdmin) => true);
  };

  // 회원가입 버튼 클릭시
  const handleSignUpBtnClick = (e) => {
    e.preventDefault();
    if (!id) {
      idRef.current.focus();
      setUserNameError("아이디를 입력하세요.");
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      setPasswordError("비밀번호를 입력하세요.");
      return;
    }
    const newUser = {
      id,
      password,
      isAdmin,
      adminToken: isAdmin ? "AAABnvxRVklrnYxKZ0aHgTBcXukeZygoC" : null,
    };
    console.log(newUser);
  };

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

  return (
    <div>
      <div>
        <button onClick={handleGeneralClick}>일반 회원 가입</button>
        <button onClick={handleAdminClick}>관리자 가입</button>
      </div>
      {isAdmin !== null ? (
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
            type="text"
            aria-describedby="passwordError"
            placeholder="비밀번호를 입력하세요."
          />
          {!!passwordError && (
            <div role="alert" id="passwordError">
              {passwordError}
            </div>
          )}
          <input
            type="text"
            ref={passwordCheckRef}
            value={passwordCheck}
            onChange={handleChangePasswordCheck}
            placeholder="비밀번호를 확인하세요."
            aria-describedby="passwordCheckError"
          />
          {passwordCheckRef.current.value !== passwordRef.current.value ? "비밀번호가 일치하지 않습니다." : "비밀번호가 일치합니다."}
          <button onClick={handleSignUpBtnClick}>회원가입</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SignUpPage;
