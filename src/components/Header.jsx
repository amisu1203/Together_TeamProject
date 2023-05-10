import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // accessToken 가져오기
  const { accessToken } = useSelector((state) => state.auth);

  // 로그인 페이지 이동
  const handleLoginBtnClick = () => {
    navigate("/api/login");
  };

  // 회원가입 페이지 이동
  const handleSignUpBtnClick = () => {
    navigate("/api/signup");
  };

  return (
    <StHeader>
      <Logo>함께하개</Logo>
      <div>
        {accessToken ? (
          <>로그인됨</>
        ) : (
          <>
            <button onClick={handleLoginBtnClick}>로그인</button>
            <button onClick={handleSignUpBtnClick}>회원가입</button>
          </>
        )}
      </div>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  background-color: #f5f5f5;
  /* background: rgb(252, 212, 188);
  background: linear-gradient(180deg, rgba(252, 212, 188, 1) 0%, rgba(255, 188, 120, 0.821187850140056) 8%, rgba(255, 255, 255, 0) 70%); */
  height: 100px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  @media screen and (min-height: 1000px) {
    padding: 0 300px;
  }
`;
