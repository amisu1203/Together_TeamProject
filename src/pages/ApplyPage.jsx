import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import Calendar from "../components/Calender";
import Button from "../components/Button";
import Select from "../components/Select";
import Header from "../components/Header";
import useToggle from "../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import confetti from "https://esm.run/canvas-confetti@1";

const FormConsultPage = () => {
  const navigate = useNavigate();

  // 이름과 시간
  const [userName, handleChangeName, setNameValue, nameRef] = useInput();
  const [number, handleChangeNumber, setNumberValue, numberRef] = useInput();
  const [userNameError, setUserNameError] = useState("");
  const [userNumberError, setUserNumberError] = useState("");

  // 모달창
  const [isOpen, handleOpenClick, setIsOpen] = useToggle();

  // 이전 페이지 이동
  const handleBackBtnClick = () => {
    window.history.back();
  };

  // 상담신청 버튼 클릭시
  const handleApplyBtnClick = () => {
    if (!userName) {
      nameRef.current.focus();
      setUserNameError("이름을 입력하세요.");
      return;
    } else if (!number) {
      numberRef.current.focus();
      setUserNumberError("번호를 입력하세요.");
      return;
    }
    handleOpenClick();
  };

  // 이름과 번호가 입력됨에 따라 에러메세지를 없애주기 위해 useEffect 사용했습니다.
  useEffect(() => {
    if (userName) {
      setUserNameError("");
    }
  }, [userName]);
  useEffect(() => {
    if (number) {
      setUserNumberError("");
    }
  }, [number]);

  // 상담신청 완료 버튼 클릭시
  const handleCompleteBtnClick = () => {
    navigate("/");
  };

  // 상담신청 완료시 폭죽 함수
  const celebrate = () => {
    confetti({
      particleCount: 180,
      spread: 100,
      zIndex: 999,
    });
  };

  // 상담신청 버튼 props
  const applyConsultBtn = { title: "상담 신청", type: "submit" };
  // 이전으로 버튼 props
  const cancelApplyConsultBtn = { title: "이전으로" };
  return (
    <>
      <Header />
      {/* 이전으로 돌아가기 버튼은 오른쪽 상단으로 배치 예정 */}
      {!!isOpen ? (
        <>
          <StModalBox />
          <StModal>
            {celebrate()}
            <h2>입양 상담 신청이 완료되었습니다!</h2>
            <p>{userName}님,</p>
            <p>0월 0일</p>
            <p>0시 00분</p>
            <p>약속 시간에 맞춰 방문 부탁드립니다.</p>

            <button onClick={handleCompleteBtnClick}>확인</button>
          </StModal>
        </>
      ) : (
        <>
          <StForm onClick={(e) => e.preventDefault()}>
            <h2>상담 신청페이지임</h2>
            <div>
              <label htmlFor="reservation_name">이름 : </label>
              <input
                ref={nameRef}
                id="reservation_name"
                value={userName}
                onChange={handleChangeName}
                type="text"
                required
                aria-describedby="nameInputError"
                placeholder="이름을 입력하세요."
              />
              {!!userNameError && (
                <div role="alert" id="nameInputError">
                  {userNameError}
                </div>
              )}
            </div>
            <Calendar />
            <Select />
            <div>
              <label htmlFor="phone_number">번호 : </label>
              <input
                ref={numberRef}
                id="phone_number"
                value={number}
                onChange={handleChangeNumber}
                type="text"
                required
                aria-describedby="numberInputError"
                placeholder="번호를 입력하세요."
              />
              <div role="alert" id="timeInputError">
                {userNumberError}
              </div>
            </div>
            <Button button={applyConsultBtn} onClickHandle={handleApplyBtnClick} />
          </StForm>
        </>
      )}
      <Button button={cancelApplyConsultBtn} onClickHandle={handleBackBtnClick} />
    </>
  );
};

export default FormConsultPage;

const StForm = styled.form`
  margin-top: 180px;
`;

const StModalBox = styled.div`
  opacity: 0.8;
  background-color: rgb(221, 221, 221);
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  inset: 0;
  z-index: 999;
  /* left: 0; */
`;

const StModal = styled.div`
  position: absolute;
  left: calc(50% - 250px);
  top: calc(50% - 150px);
  border-radius: 12px;
  box-sizing: border-box;
  padding: 24px;
  background-color: #ffffff;
  width: 500px;
  height: 300px;
  z-index: 999;
`;
