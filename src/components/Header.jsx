import React from "react";
import styled from "styled-components";
import logo from "../img/logo.png";

const Header = () => {
  return (
    <StHeader>
      <StLogo>LOGO</StLogo>
      {/* 기본 상태 - 회원가입/로그인 */}
      {/* 로그인 상태 - 유저 정보 */}
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  margin-bottom: 90px;
  height: 100px;
`;

const StLogo = styled.h1`
  background-image: url(${logo});
  background-size: cover;
  width: 200px;
  height: 200px;
  text-indent: -9999px;
  position: relative;
  top: -30px;
  margin: 0 auto;
`;
