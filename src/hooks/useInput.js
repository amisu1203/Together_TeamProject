import React, { useRef, useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  const valueRef = useRef();
  const handler = (e) => {
    setValue(e.target.value);
  };

  return [value, handler, setValue, valueRef];
};

export default useInput;
