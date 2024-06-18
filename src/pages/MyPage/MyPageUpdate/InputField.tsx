import React from "react";
import Input from "../../../components/Common/Input";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorText?: string | boolean;
  disabled?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  size?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  errorText,
  disabled = false,
  onBlur,
  size = "large",
}) => (
  <div className="flex items-center mb-2">
    <label className="block text-gray-700 w-32">{label}</label>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name="test"
      size={size}
      errorText={errorText}
      disabled={disabled}
      onBlur={onBlur}
    />
  </div>
);

export default InputField;
