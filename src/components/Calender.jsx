import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerForApply = ({ handleSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleSelectDate(moment(date).format("YYYY년 MM월 DD일"));
  };

  return (
    <div>
      <p>날짜 : </p>
      <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy년 MM월 dd일" />
    </div>
  );
};

export default DatePickerForApply;
