import React from "react";
import { LANGUAGE_VERSIONS } from "../Constants";
import { Button } from "../../../components/Common";
import "../../../styles/tailwind.scss";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-primary";

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (lang: string) => {
    onSelect(lang);
    setIsOpen(false);
  };

  return (
    <div className="ml-2 mb-4">
      <div className="relative inline-block">
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
      </div>
    </div>
  );
};

export default LanguageSelector;
