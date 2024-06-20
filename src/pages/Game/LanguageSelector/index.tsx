import React, { useEffect, useState } from "react";
import { LANGUAGE_VERSIONS } from "../Constants";
import { Dropdown } from "../../../components/Common";
import "../../../styles/tailwind.scss";

const languages = Object.keys(LANGUAGE_VERSIONS);

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

  useEffect(() => {
    onSelect(lang);
  }, [lang]);
  return (
    <Dropdown
      options={langOptions}
      selectedValue={lang}
      onChange={(value) => {
        setLang(value);
      }}
      showMinutes={false}
    />
  );
};

export default LanguageSelector;
