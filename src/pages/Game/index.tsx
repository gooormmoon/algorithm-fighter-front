import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
// import CompetitorProfile from "../Wait/CompetitorProfile";
import Output from "./Output";
import { OnMount } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./Constants";
import { executeCode } from "./temporary_api";
import { Button } from "../../components/Common";
import GameProblem from "./GameProblem";
import TimerIcon from "@mui/icons-material/Timer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Chat from "../../components/Chat";
import { VictoryModal, DefeatModal, TestCaseModal } from "./GameModal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [victoryModalOpen, setVictoryModalOpen] = useState(false);
  const [defeatModalOpen, setDefeatModalOpen] = useState(false);

  //TestCaseModal
  const toggleModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
  ) => {
    modalSetter(isOpen);
  };

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
      <div className="flex justify-start items-center w-full h-full  overflow-hidden">
        <div className="w-3/4 h-full flex ">
          <div className="h-full" style={{ width }}>
            {/* <section className="top-20 left-4 absolute w-[340px] h-[140px]  bg-transparent ">
              <CompetitorProfile />
            </section> */}
            <section className="w-full h-full">
              <GameProblem />
            </section>
          </div>
          <div
            className="flex justify-center items-center w-4 bg-black/20 cursor-col-resize hover:bg-black/50 "
            onMouseDown={onMouseDownX}
          />
          <div className="w-full h-full flex flex-col overflow-hidden">
            <section className="w-full overflow-hidden" style={{ height }}>
              <div className="w-full h-16 bg-transparent flex justify-between items-center p-4 gap-2">
                <div className=" flex justify-start items-center gap-2 ">
                  <LanguageSelector language={language} onSelect={onSelect} />
                  <TimerIcon />
                  <span className="text-xl">59:59</span>

                  <Button
                    type="button"
                    size="medium_big_radius"
                    color="secondary"
                    textColor="primary_font"
                    name="테스트 케이스"
                    onClick={() => setModalOpen(true)}
                  />
                  <Button
                    type="button"
                    size="medium_small_radius"
                    color="secondary"
                    textColor="primary_font"
                    name="승리"
                    onClick={() => setVictoryModalOpen(true)}
                  />
                  <Button
                    type="button"
                    size="medium_small_radius"
                    color="secondary"
                    textColor="primary_font"
                    name="패배"
                    onClick={() => setDefeatModalOpen(true)}
                  />
                </div>
                <div className="flex justify-start items-center gap-4">
                  <Button
                    type="button"
                    size={"small_radius"}
                    onClick={runCode}
                    color="primary"
                    textColor="secondary_color_font"
                    name={"Run Code"}
                    isLoading={isLoading}
                    icon={<PlayArrowIcon />}
                  />
                  <Button
                    type="button"
                    size={"small_radius"}
                    // onClick={runCode}
                    color="primary"
                    textColor="secondary_color_font"
                    name={"SUBMIT"}
                  />
                </div>
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
           bg-black/20  hover:bg-black/50
            cursor-row-resize "
              onMouseDown={onMouseDownY}
            />
            <section className="w-full flex-1 flex overflow-hidden p-2">
              <Output isError={isError} output={output} />
            </section>
          </div>
        </div>
        <div className="w-1/4 h-full bg-transparent p-4 ">
          <Chat />
        </div>
      </div>
      {modalOpen && (
        <TestCaseModal
          isOpen={true}
          onClose={() => {
            toggleModal(setModalOpen, false);
          }}
          setModalOpen={setModalOpen}
        />
      )}
      {victoryModalOpen && (
        <VictoryModal
          isOpen={true}
          onClose={() => setVictoryModalOpen(false)}
        />
      )}
      {defeatModalOpen && (
        <DefeatModal isOpen={true} onClose={() => setDefeatModalOpen(false)} />
      )}
      {/* <Footer runCode={runCode} isLoading={isLoading} /> */}
    </main>
  );
};

export default Game;
