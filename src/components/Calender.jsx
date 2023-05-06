import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS 파일 import
import "bootstrap/dist/js/bootstrap";
import "bootstrap-datepicker/dist/js/bootstrap-datepicker";

const Calendar = () => {
  const datepickerRef = useRef();

  useEffect(() => {
    $(datepickerRef.current).datepicker({
      uiLibrary: "bootstrap4",
      format: "yyyy-mm-dd",
    });
  }, []);

  return (
    <div>
      <div className="form-group">
        <label>날짜 : </label>
        <input ref={datepickerRef} />
      </div>
    </div>
  );
};

export default Calendar;
