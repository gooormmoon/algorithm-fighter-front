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
import { useStomp } from "../../store/store";
import { autoUserSubmitCode, submitCode, gradeCode } from "../../api/Game/";
import { v4 as uuidv4 } from "uuid";
//TestCase type
type TestCase = {
  id: string;
  value: string;
  result: string;
};

const Game = () => {
  //STOMP
  const { gameClient } = useStomp();

  //layout Grid
  const [isResizing, setIsResizing] = useState({
    x: false,
    y: false,
  });
  const [initial, setInitial] = useState({
    x: 0,
    y: 0,
  });
  const [size, setSize] = useState({
    width: window.innerWidth / 3,
    height: window.innerHeight / 1.5,
  });
  const [isResizingX, setIsResizingX] = useState(false);
  const [isResizingY, setIsResizingY] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [width, setWidth] = useState(window.innerWidth / 3);
  const [height, setHeight] = useState(window.innerHeight / 1.5);

  // codeEditor
  const [language, setLanguage] = useState<string>("javascript");
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<any>(null);

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const [victoryModalOpen, setVictoryModalOpen] = useState(false);
  const [defeatModalOpen, setDefeatModalOpen] = useState(false);

  // After game start
  const [problemTitle, setProblemTitle] = useState<string>("");
  const [problemData, setProblemData] = useState<string>("");
  const [problemLevel, setProblemLevel] = useState<string>("");
  const [problemCodeTemplate, setProblemCodeTemplate] = useState<string>("");
  //Is Game End?
  const [gaming, setGaming] = useState<boolean>(false);
  //TestCase
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: uuidv4(), value: "", result: "" },
  ]);
  //Runcode
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // Runcode response
  const [outcomeMessage, setOutcomeMessage] = useState<string>("");
  //Get Problem Content

  //STOMP
  useEffect(() => {
    if (gameClient) {
      gameClient.subscribe("/user/queue/game/session", (message) => {
        try {
          const data = JSON.parse(message.body);

          //게임시작
          if (data.title && data.content && data.level && data.code_templates) {
            setProblemData(data.problemData);
            setProblemTitle(data.problemTitle);
            setProblemCodeTemplate(data.problemCodeTemplate);
            setGaming(true);
            console.log("game start");
          }
          //게임종료
          if (data.running_time && data.game_over_type) {
            if (data.game_over_type === "win") {
              //게임 승리 모달
              setVictoryModalOpen(true);
            }
            if (data.game_over_type === "lose") {
              setDefeatModalOpen(true);
            }
            if (data.game_over_type === "time_over") {
              //게임 타임오버 모달
            }
          }

          // 게임 끝났음요
          console.log(data.game_over_type);
          setGaming(false);

          //게임 종료시 자동으로 보내기
          const sourceCode = editorRef.current.getValue();
          autoUserSubmitCode(gameClient, {
            code: sourceCode.files[0].content,
            language: sourceCode.language,
          });
        } catch (e) {
          console.error("Failed to parse message:", e);
        }
      });
      //채점 결과 수신 - 미완
      gameClient.subscribe("/app/game/submit", (message) => {});
    }
  }, [gameClient]);

  //테스트 케이스 입력
  const handleInputChange = (
    id: string,
    type: "value" | "result",
    newValue: string
  ) => {
    const newTestCases = testCases.map((testCase) => {
      if (testCase.id === id) {
        return { ...testCase, [type]: newValue };
      }
      return testCase;
    });
    setTestCases(newTestCases);
  };
  //테스트 케이스 추가
  const addTestCase = () => {
    setTestCases([...testCases, { id: uuidv4(), value: "", result: "" }]);
  };
  //테스트 케이스 삭제
  const handleDelete = (id: string) => {
    const newTestCases = testCases.filter((testCase) => testCase.id !== id);
    setTestCases(newTestCases);
  };
  //테스트 케이스 제출
  const handleSubmitTestCases = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("test-case", JSON.stringify(testCases));
    setModalOpen(false);
  };

  //테스트 케이스 모달 => 왜 안쓰일까? 어디서 삭제됐는지 몰라서 남겨둠
  // const toggleModal = (
  //   modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
  //   isOpen: boolean
  // ) => {
  //   modalSetter(isOpen);
  // };

  //게임 코드 제출
  const handleSubmit = () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    setIsLoading(true);
    if (gameClient) {
      submitCode(gameClient, {
        code: sourceCode.files[0].content,
        language: sourceCode.language,
      });
    }
  };
  // 게임 코드 제출 테스트
  // var arr1 = testCases.map((tc) => tc.value).join("\n");
  // var arr2 = testCases.map((tc) => tc.result).join("\n");
  // console.log(arr1);
  // console.log(arr2);
  useEffect(() => {
    if (modalOpen) {
      const storedTestCases = localStorage.getItem("test-case");
      if (storedTestCases) {
        setTestCases(JSON.parse(storedTestCases));
      } else {
        setTestCases([{ id: uuidv4(), value: "", result: "" }]);
      }
    }
  }, [modalOpen]);
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const response = await gradeCode({
        code: sourceCode,
        language: sourceCode.language,
        input: testCases.map((tc) => tc.value).join("\n"), // 문자열로 변환
        expected: testCases.map((tc) => tc.result).join("\n"),
      });
      const { output, message } = response.data;
      setOutput(output);
      setOutcomeMessage(message);
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
  // 기존 api
  // const runCode = async () => {
  //   const sourceCode = editorRef.current?.getValue();
  //   console.log(typeof sourceCode);
  //   if (!sourceCode) return;
  //   try {
  //     setIsLoading(true);
  //     const { run: result } = await executeCode(language, sourceCode);
  //     if (result.stderr) {
  //       throw new Error(result.stderr);
  //     }
  //     setOutput(result.output.split("\n"));
  //     setIsError(false);
  //     console.log(result);
  //   } catch (error) {
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  //에디터 마운트 시 focus
  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  // 에디터 언어 선택
  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  // Layout handling
  const onMouseDownX = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing((prev) => {
      return {
        ...prev,
        x: true,
      };
    });
    // setIsResizingX(true);
    setInitialX(e.clientX);
  };

  const onMouseDown = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    setIsResizing((prev) => {
      return {
        ...prev,
        [type]: true,
      };
    });
    setInitial((prev) => {
      return {
        ...prev,
        [type]: `${"e.client" + type.toUpperCase()}`,
        // [type]: e[`client${type.toUpperCase()}`],
      };
    });
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

  // Layout Resizing
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
            <section className="w-full h-full">
              <GameProblem
                problemTitle={problemTitle}
                problemData={problemData}
              />
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
                    onClick={handleSubmit}
                    color="primary"
                    textColor="secondary_color_font"
                    name={"SUBMIT"}
                    isLoading={false}
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
              <Output
                isError={isError}
                output={output}
                outcomeMessage={outcomeMessage}
              />
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
          onClose={() => setModalOpen(false)}
          testCases={testCases}
          handleInputChange={handleInputChange}
          handleDelete={handleDelete}
          handleSubmit={handleSubmitTestCases}
          addTestCase={addTestCase}
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
