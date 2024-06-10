import React from "react";
import styles from "./input.module.scss"
interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  size: string;
  errorText?: string | boolean; 
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  // onKeyPress,
  size,
  errorText,
}) => {
  // console.log("input is rendering...");
  return (
    <div className="p-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        // onKeyPress={onKeyPress}
        className={`shadow-lg outline-none p-4 rounded-md text-[#213363]  bg-white border-solid border-2 border-[#213363] ${size==="large" ? "w-[360px] h-[56px] text-lg ":"w-[200px] h-[32px] text-sm"} ${errorText && " border-red-500"}`}
      />
      {errorText && <p className="w-[360px] text-red-500 text-sm  absolute">{errorText}</p>}
    </div>
  );
};

export default Input;
