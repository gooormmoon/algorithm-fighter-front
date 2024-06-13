import React from "react";

interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex justify-between items-center mb-4">
    <label className="block text-gray-700 ">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-[360px] h-[100px] outline-none p-4 rounded-md text-secondary  bg-white border-solid border-2 border-secondary 
      drop-shadow-lg shadow-lg  max-h-[120px] text-lg"
    />
  </div>
);

export default TextAreaField;
