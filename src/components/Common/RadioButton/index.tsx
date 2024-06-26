import React from "react";

interface RadioButtonProps {
  selectedValue: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export function RadioButton({
  selectedValue,
  onChange,
  readOnly,
}: RadioButtonProps) {
  const levels = ["1", "2", "3", "4", "5"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="grid w-full grid-cols-5 gap-2 rounded-md bg-gray-200 p-2">
        {levels.map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="option"
              id={option + ""}
              value={option}
              className="peer hidden"
              checked={selectedValue === option}
              onChange={handleChange}
            />
            <label
              htmlFor={option + ""}
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-secondary peer-checked:font-bold peer-checked:text-white duration-200 ease-out text-secondary"
            >
              {"lv" + option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioButton;
