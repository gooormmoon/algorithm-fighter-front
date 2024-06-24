import React, { useState } from "react";
import Row from "./Row";
import CodeEditor from "../Game/CodeEditor";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "../../store/store";

export type ResultListType = {
  title: string;
  running_time: number;
  gameresult_id: number;
};
const dummy: { title: string; running_time: number; gameresult_id: number }[] =
  [{ title: "엄청어려운문제", running_time: 300, gameresult_id: 12314 }];

const MyPage = () => {
  const { theme } = useTheme();
  const [code, setCode] = useState("code");
  const onClick = (value: string) => {
    setCode(value);
    console.log(value);
  };
  return (
    <main className="w-full h-full flex justify-evenly items-center">
      <section className="w-1/2 h-full p-4 flex flex-col justify-start items-center">
        {dummy.map((gameList, index) => {
          return (
            <Row
              key={gameList.gameresult_id}
              gameResultList={gameList}
              onClick={onClick}
            />
          );
        })}
      </section>
      <section className="w-1/2 h-full">
        <Editor
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          height="90vh"
          defaultLanguage="javascript"
          defaultValue={code}
          value={code}
        />
      </section>
    </main>
  );
};

export default MyPage;
