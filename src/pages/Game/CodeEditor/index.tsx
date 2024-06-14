import React from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { useState } from "react";
import { CODE_SNIPPETS } from "../Constants";
import { Button } from "../../../components/Common";

interface CodeEditorProps {
  language: string;
  onMount: OnMount;
  setValue: (value: string) => void;
  value: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  onMount,
  setValue,
  value,
}) => {
  const [theme, setTheme] = useState<string>("vs-light");

  //테마 전역 설정 전 테스트
  const themeClick = () => {
    setTheme((prevTheme) =>
      prevTheme === "vs-light" ? "vs-dark" : "vs-light"
    );
  };

  return (
    <>
      <Button
        type="button"
        size={"medium_small_radius"}
        onClick={themeClick}
        color="secondary"
        textColor="primary_font"
        name={"테마 바꾸기"}
      ></Button>
      <div className="flex"></div>
      <Editor
        width={"100%"}
        // height="75vh"
        theme={theme}
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value || "")}
      ></Editor>
    </>
  );
};

export default CodeEditor;
