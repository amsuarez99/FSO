import { useState } from "react";

export const useField = ({ name, type }) => {
  const [value, setValue] = useState("");

  return {
    name,
    type,
    value,
    onChange(e) {
      setValue(e.target.value);
    },
    reset() {
      setValue("");
    },
  };
};
