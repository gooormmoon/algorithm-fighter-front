import React from "react";

interface TextAreaFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  placeholder,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center mb-4">
      <label className="block text-gray-700 w-[180px]">{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border-2 p-2 w-full"
        disabled={disabled}
      />
    </div>
  );
};

export default TextAreaField;
