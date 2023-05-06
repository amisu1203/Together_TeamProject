import React from "react";
import styled from "styled-components";

const Button = ({ button, onClick, isDisabled }) => {
  return button.purpose === "more info" ? <StBtn onClick={onClick}>{button.title}</StBtn> : <button onClick={onClick}>{button.title}</button>;
};

export default Button;

const StBtn = styled.button`
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
`;
