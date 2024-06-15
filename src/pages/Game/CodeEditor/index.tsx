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
  // const [theme, setTheme] = useState<string>("vs-light");

  //테마 전역 설정 전 테스트
  // const themeClick = () => {
  //   setTheme((prevTheme) =>
  //     prevTheme === "vs-light" ? "vs-dark" : "vs-light"
  //   );
  // };
  const setEditorTheme = (monaco: any) => {
    monaco.editor.defineTheme("onedark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          token: "comment",
          foreground: "#5d7988",
          fontStyle: "italic",
        },
        { token: "constant", foreground: "#e06c75" },
      ],
      colors: {
        "editor.background": "#19282d",
      },
    });
  };

  return (
    <>
      {/* <Button
        type="button"
        size={"medium_small_radius"}
        onClick={themeClick}
        color="secondary"
        textColor="primary_font"
        name={"테마 바꾸기"}
      ></Button> */}
      {/* <div className="flex"></div> */}
      <Editor
        width={"100%"}
        // height="75vh"
        // theme={localStorage.getItem("theme") || "vs-light"}
        theme={"onedark"}
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        beforeMount={setEditorTheme}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value || "")}
      ></Editor>
    </>
  );
};

export default CodeEditor;
