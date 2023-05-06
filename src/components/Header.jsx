import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

const Header = () => {
  return (
    <StHeader>
      <Logo>함께하개</Logo>
      {/* 기본 상태 - 회원가입/로그인 */}
      {/* 로그인 상태 - 유저 정보 */}
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
