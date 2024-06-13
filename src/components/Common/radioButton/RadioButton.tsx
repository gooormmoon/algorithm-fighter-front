import React, { useState } from 'react'

export function RadioButton() {
  const [selectedValue, setSelectedValue] = useState('');
  const levels = ['lv0', 'lv1', 'lv2', 'lv3', 'lv4'];
  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid w-full grid-cols-5 gap-2 rounded-xl bg-gray-200 p-2">
        {levels.map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="option"
              id={option}
              value={option}
              className="peer hidden"
              checked={selectedValue === option}
              onChange={handleChange}
            />
            <label
              htmlFor={option}
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#213363] peer-checked:font-bold peer-checked:text-white duration-200 ease-out"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioButton;