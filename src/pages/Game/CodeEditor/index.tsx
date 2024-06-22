import React from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { useState } from "react";
import { CODE_SNIPPETS } from "../Constants";
import { Button } from "../../../components/Common";
import { useTheme } from "../../../store/store";
import { toast } from "react-toastify";

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
  const { theme } = useTheme();
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
        {
          token: "constant",
          foreground: "#e06c75",
        },
      ],
      colors: {
        "editor.background": "#1f2d35",
      },
    });
  };
  const handleEditorMount: OnMount = (editor, monaco) => {
    try {
      onMount(editor, monaco);
    } catch (error) {
      toast.error("에디터를 로드하는 데 문제가 발생했습니다.");
    }
  };
  return (
    <>
      <Editor
        width={"100%"}
        // height="75vh"
        // theme={localStorage.getItem("theme") || "vs-light"}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        beforeMount={setEditorTheme}
        onMount={handleEditorMount}
        value={value}
        onChange={(value) => setValue(value || "")}
      ></Editor>
    </>
  );
};

export default CodeEditor;
