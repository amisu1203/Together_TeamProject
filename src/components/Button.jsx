import React from "react";
import styled from "styled-components";

const Button = ({ button, onClickHandle, isDisabled }) => {
  return button.purpose === "more info" ? (
    <StBtn type="button" onClick={onClickHandle}>
      {button.title}
    </StBtn>
  ) : (
    <button type={button.type || "button"} onClick={onClickHandle}>
      {button.title}
    </button>
  );
};

export default Button;

const StBtn = styled.button`
  /* display: inline-block; */
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  padding: 10px 0;
`;
