import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import Calendar from "../components/Calender";
import Button from "../components/Button";
import Select from "../components/Select";
import Header from "../components/Header";
import useToggle from "../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import confetti from "https://esm.run/canvas-confetti@1";
import { useDispatch, useSelector } from "react-redux";
import { addApplyForm } from "../redux/modules/applyFormSlice";

const FormConsultPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 상태
  // 이름과 번호
  const [userName, handleChangeName, , nameRef] = useInput();
  const [number, handleChangeNumber, , numberRef] = useInput();
  const [userNameError, setUserNameError] = useState("");
  const [userNumberError, setUserNumberError] = useState("");
  // 날짜와 시간
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  // 모달창
  const [isOpen, handleOpenClick, setIsOpen] = useToggle();

  // 이전 페이지 이동
  const handleBackBtnClick = () => {
    window.history.back();
  };

  // 상담신청 버튼 클릭 핸들러
  const handleApplyBtnClick = () => {
    if (!userName) {
      nameRef.current.focus();
      setUserNameError("이름을 입력하세요.");
      return;
    }
    if (!number) {
      numberRef.current.focus();
      setUserNumberError("번호를 입력하세요.");
      return;
    }
    if (!selectedDate) {
      console.log("시간 선택 안함!");
    }
    const newApplyForm = {
      name: userName,
      date: selectedDate,
      time: selectedTime,
      phoneNumber: number,
    };
    dispatch(addApplyForm(newApplyForm));
    handleOpenClick();
  };

  // 입력창 에러 메세지 노출
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

  // Calendar 컴포넌트에서 선택한 날짜를 전달받음
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  // Select 컴포넌트에서 선택한 시간을 전달받음
  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

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
            <p>{selectedDate}</p>
            <p>{selectedTime}</p>
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
            <Calendar handleSelectDate={handleSelectDate} />
            <Select handleSelectTime={handleSelectTime} />
            <div>
              <label htmlFor="phone_number">번호 : </label>
              <input
                ref={numberRef}
                id="phone_number"
                value={number}
                onChange={handleChangeNumber}
                type="text"
                maxLength="11"
                required
                aria-describedby="numberInputError"
                placeholder="번호를 입력하세요."
                pattern="[0-9]{11}"
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
