import React from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import Calendar from "../components/Calender";
import Button from "../components/Button";
import Select from "../components/Select";

const FormConsultPage = () => {
  const [reservation_name, onChangeReservationName, setValue] = useInput();
  const applyConsultBtn = { title: "상담 신청" };

  return (
    <StForm>
      <h1>상담 신청서</h1>
      <div>
        <label htmlFor="reservation_name">이름 : </label>
        <input id="reservation_name" value={reservation_name} onChange={onChangeReservationName} type="text" required aria-describedby="author-error" />
      </div>
      <Calendar />
      <Select />
      <Button button={applyConsultBtn} />
    </StForm>
  );
};

export default FormConsultPage;

const StForm = styled.form``;
