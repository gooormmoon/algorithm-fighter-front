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
  <div className="flex items-center mb-4">
    <label className="block text-gray-700 ">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-[195px] h-[73.6px] ml-[111px] border border-gray-300 rounded"
    />
  </div>
);

export default TextAreaField;
