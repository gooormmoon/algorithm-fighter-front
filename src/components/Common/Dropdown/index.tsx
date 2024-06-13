import React, { useState } from "react";

interface DropdownProps<T> {
  options: T[];
  selectedValue: T;
  onChange: (value: T) => void;
  showMinutes?: boolean;
}

const Dropdown = <T extends string | number>({
  options,
  selectedValue,
  onChange,
  showMinutes,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: T) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative  inline-block text-left z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[120px] bg-white px-4 py-2 rounded-md shadow ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {showMinutes ? `${selectedValue}` : selectedValue}
      </button>

      {isOpen && (
        <div className="w-[120px] absolute mt-2 w-46 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleChange(option)}
              className="w-[120px] block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer flex justify-center"
            >
              {showMinutes ? `${option} ` : option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
