import React from "react";
import logo from "../img/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "animate.css";

const Logo = () => {
  const navigate = useNavigate();
  // 홈페이지 이동 핸들러
  const HandleLogoClick = () => {
    navigate("/");
  };

  return (
    <StHomeLogo onClick={HandleLogoClick} className="animate__heartBeat">
      LOGO
    </StHomeLogo>
  );
};

export default Logo;

const StHomeLogo = styled.h1`
  background-image: url(${logo});
  background-size: cover;
  width: 130px;
  height: 140px;
  text-indent: -9999px;
  position: relative;
  top: -20px;
  cursor: pointer;
`;

// const StSideLogo = styled.h1`
//   background-image: url(${logo});
//   background-size: cover;
//   width: 180px;
//   height: 170px;
//   text-indent: -9999px;
//   position: relative;
//   top: -20px;
//   left: -40%;
//   cursor: pointer;
// `;
