import React, { useRef } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { useState } from "react";
import { CODE_SNIPPETS } from "../Constants";
import { Button } from "../../../components/Common";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

interface CodeEditorProps {}

const CodeEditor: React.FC<CodeEditorProps> = () => {
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("vs-light");

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  //테마 전역 설정 전 테스트
  const themeClick = () => {
    setTheme((prevTheme) =>
      prevTheme === "vs-light" ? "vs-dark" : "vs-light"
    );
  };

  return (
    <>
      <LanguageSelector language={language} onSelect={onSelect} />
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
        width={"60%"}
        height="75vh"
        theme={theme}
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value || "")}
      ></Editor>
      <Output editorRef={editorRef} language={language} />
    </>
  );
};

export default CodeEditor;
