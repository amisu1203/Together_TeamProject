import React from "react";
import logo from "../img/logo.png";
import styled from "styled-components";

const Logo = () => {
  return <StLogo>LOGO</StLogo>;
};

export default Logo;

const StLogo = styled.h1`
  background-image: url(${logo});
  background-size: cover;
  width: 180px;
  height: 170px;
  text-indent: -9999px;
`;
