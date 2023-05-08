import React, { useCallback, useState } from "react";
import styled from "styled-components";

const Select = ({ handleSelectTime }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [text, setText] = useState("시간을 선택하세요.");

  // li 클릭시 text 변경
  const handleClickLi = useCallback((e) => {
    setText((text) => e.target.innerText);
    setIsToggled((isToggled) => !isToggled);
    handleSelectTime(e.target.innerText);
  }, []);

  const handleBtnToggle = useCallback(() => {
    setIsToggled((isToggled) => !isToggled);
  }, []);

  const langList = ["09시 30분", "10시 30분", "14시 30분", "16시 30분"];

  return (
    <StContainer>
      <StListBtn type="button" onClick={handleBtnToggle}>
        <div>{text}</div>
        <div>▼</div>
      </StListBtn>
      {isToggled ? (
        <StBoxList className="ul">
          {langList.map((item) => (
            <StList onClick={handleClickLi} key={item}>
              {item}
            </StList>
          ))}
        </StBoxList>
      ) : (
        <></>
      )}
    </StContainer>
  );
};

// styled components
const StContainer = styled.div`
  position: relative;
`;

const StTxt = styled.p`
  font-size: 32px;
  font-weight: 700;
  margin: 20px 0;
`;
const StListBtn = styled.button`
  border: 1px solid rgb(221, 221, 221);
  height: 40px;
  width: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 28px;
`;

const StBoxList = styled.ul`
  border: 1px solid rgb(221, 221, 221);
  width: 300px;
  padding: 0;
  border-radius: 12px;
  background-color: rgb(255, 255, 255);
  line-height: 40px;
  position: absolute;
  top: 40px;
`;

const StList = styled.li`
  list-style: none;
  height: 40px;
  padding: 0 28px;
  font-size: 13px;
`;
export default Select;
