import React, { useState } from 'react';

interface DropdownProps<T> {
  options: T[];
  selectedValue: T;
  onChange: (value: T) => void;
  showMinutes? : boolean;
}

const Dropdown = <T extends string | number>({ options, selectedValue, onChange, showMinutes }: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: T) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white px-4 py-2 rounded-md shadow ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {showMinutes ? `${selectedValue} minute` : selectedValue}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-46 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleChange(option)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              {showMinutes ? `${option} minute` : option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;