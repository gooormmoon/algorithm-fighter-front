import React from "react";
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
  disabled?: boolean;
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
  disabled,
}) => {
  return (
    <div className="py-2">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        // onKeyPress={onKeyPress}
        className={`shadow-lg outline-none p-4 rounded-md text-secondary  bg-white border-solid border-2 border-secondary 
        drop-shadow-lg 
        ${
          size === "large"
            ? "w-[360px] h-[56px] text-lg "
            : "w-[320px] h-[48px] text-sm"
        } ${errorText && " border-red-500"}`}
      />
      {errorText && (
        <p className="w-[360px] text-red-500 text-sm  absolute">{errorText}</p>
      )}
    </div>
  );
};

export default Input;
