import React, { useEffect, useState } from "react";
import { LANGUAGE_VERSIONS } from "../Constants";
import { Dropdown } from "../../../components/Common";
import { toast } from "react-toastify";

import "../../../styles/tailwind.scss";

const languages = Object.keys(LANGUAGE_VERSIONS);

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
  setLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onSelect,
  setLanguage,
}) => {
  const langOptions = [...languages];
  const [lang, setLang] = useState<string>(langOptions[0]);

  useEffect(() => {
    onSelect(lang);
    setLanguage(lang);
    toast.info(`언어가 ${lang}로 변경되었습니다.`);
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
