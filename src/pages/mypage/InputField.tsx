import React from "react";
import Input from "../../components/Common/input/Input";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  errorText,
}) => (
  <div className="flex items-center mb-4">
    <label className="block text-gray-700 w-32">{label}</label>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name="test"
      size="large"
      errorText={errorText}
    />
  </div>
);

export default InputField;
