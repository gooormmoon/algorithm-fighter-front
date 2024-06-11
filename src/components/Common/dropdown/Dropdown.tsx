import React, { useState } from 'react';

export function Dropdown() {
  const options = [10, 20, 30, 40, 50, 60];
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: React.SetStateAction<number>) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white px-4 py-2 rounded-md shadow ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {selectedValue} minute
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-46 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleChange(option)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              {option} minute
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
