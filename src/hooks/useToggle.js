import React, { useState } from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);

  const handler = () => {
    setValue((value) => !value);
  };

  return [value, handler, setValue];
};

export default useToggle;
