import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import CompetitorProfile from "./CompetitorProfile";
import Output from "./Output";
import { OnMount } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./Constants";
import { executeCode } from "./temporary_api";
import { Button } from "../../components/Common";
import GameProblem from "./GameProblem";
import Footer from "./Footer";

const Game = () => {
  const [isResizingX, setIsResizingX] = useState(false);
  const [isResizingY, setIsResizingY] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [width, setWidth] = useState(window.innerWidth / 3);
  const [height, setHeight] = useState(window.innerHeight / 1.5);
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState<string>("javascript");
  const [value, setValue] = useState<string>("");

  //Runcode
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      if (!!result.stderr) {
        throw new Error(result.stderr);
      }
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(true);
        console.log(error.message);
        alert(error.message || "Unable to run code");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  const onMouseDownX = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingX(true);
    setInitialX(e.clientX);
  };

  const onMouseDownY = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingY(true);
    setInitialY(e.clientY);
  };

  const onMouseUp = () => {
    setIsResizingX(false);
    setIsResizingY(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isResizingX) {
      const newWidth = width + e.clientX - initialX;
      setInitialX(e.clientX);
      if (newWidth >= 440 && newWidth <= 1600) {
        setWidth(newWidth);
      }
    }
    if (isResizingY) {
      const newHeight = height + e.clientY - initialY;
      setInitialY(e.clientY);
      if (newHeight >= 120 && newHeight <= 2600) {
        setHeight(newHeight);
      }
    }
  };

  useEffect(() => {
    if (isResizingX || isResizingY) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizingX, isResizingY]);

  return (
    <main className="w-full h-full flex flex-col ">
      <div className="w-full h-full flex overflow-hidden">
        <div className="h-full" style={{ width }}>
          <section className="top-20 left-4 absolute w-[340px] h-[140px]  bg-transparent ">
            {/* top-20 left-4 absolute  */}
            <CompetitorProfile />
          </section>
          <section className="w-full h-full">
            <GameProblem />
          </section>
        </div>
        <div
          className="flex justify-center items-center w-3 border-4 border-transparent bg-gray-100 cursor-col-resize hover:bg-gray-200 "
          onMouseDown={onMouseDownX}
        ></div>
        <div className="w-full h-full flex flex-col overflow-hidden">
          <section className="w-full overflow-hidden" style={{ height }}>
            <div className="w-full h-12 bg-white flex justify-end p-4">
              <LanguageSelector language={language} onSelect={onSelect} />
            </div>
            <CodeEditor
              language={language}
              onMount={onMount}
              setValue={setValue}
              value={value}
            />
          </section>
          <div
            className="flex flex-col justify-center items-center w-full h-3
           border-4 border-transparent bg-gray-100  hover:bg-gray-200
            cursor-row-resize "
            onMouseDown={onMouseDownY}
          ></div>
          <section className="w-full flex-1  flex overflow-hidden">
            <Output isError={isError} output={output} />
          </section>
        </div>
      </div>

      <Footer runCode={runCode} isLoading={isLoading} />
    </main>
  );
};

export default Game;
