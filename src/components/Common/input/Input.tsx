import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  style: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  // onKeyPress,
  style,
}) => {
  // console.log("input is rendering...");
  return (
    <div className="p-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // onKeyPress={onKeyPress}
        className={style}
      />
    </div>
  );
};

export default Input;
