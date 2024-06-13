import React, { useEffect, useState } from "react";
import { LANGUAGE_VERSIONS } from "../Constants";
import { Button, Dropdown } from "../../../components/Common";
import "../../../styles/tailwind.scss";

// const languages = Object.entries(LANGUAGE_VERSIONS);
const languages = Object.keys(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-primary";

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onSelect,
}) => {
  const langOptions = [...languages];
  const [lang, setLang] = useState<string>(langOptions[0]);

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (lang: string) => {
    onSelect(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    onSelect(lang);
  }, [lang]);
  return (
    <div className="ml-2 mb-4">
      {/* <div className="relative inline-block">
        <Button
          type="button"
          size={"medium_small_radius"}
          onClick={toggleMenu}
          color="secondary"
          textColor="primary_font"
          name={language}
        ></Button>

        {isOpen && (
          <ul className="absolute z-10 bg-[#110c1b] mt-2 w-full rounded-md shadow-lg">
            {languages.map(([lang, version]) => (
              <li
                key={lang}
                className={`cursor-pointer px-4 py-2 ${
                  lang === language ? `${ACTIVE_COLOR}` : "text-white"
                } hover:bg-gray-900 hover:text-primary`}
                onClick={() => handleSelect(lang)}
              >
                {lang}{" "}
                <span className="text-gray-600 text-sm">({version})</span>
              </li>
            ))}
          </ul>

        )}
      </div> */}
      <Dropdown
        options={langOptions}
        selectedValue={lang}
        onChange={(value) => {
          setLang(value);
        }}
        showMinutes={true}
      />
    </div>
  );
};

export default LanguageSelector;
