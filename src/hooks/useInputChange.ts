// InputChange 커스텀 훅
import { useState } from "react";

const useInputChange = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };
  return [value, handleChange, setValue] as const;
};

export default useInputChange;
