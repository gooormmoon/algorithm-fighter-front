import React, { useState } from "react";
import Row from "./Row";
import CodeEditor from "../Game/CodeEditor";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "../../store/store";
import { useMount } from "react-use";
import { getGameResults } from "../../api/MyPage";

export type ResultListType = {
  title: string;
  running_time: number;
  gameresult_id: number;
};

const MyPage = () => {
  const { theme } = useTheme();
  const [code, setCode] = useState("code");
  const [gameResults, setGameResults] = useState<ResultListType[]>([]);

  const getResults = async () => {
    try {
      const response = await getGameResults();
      if (response.status === 200) {
        console.log(response.data.data);
        const data = response.data.data;
        setGameResults(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useMount(() => {
    getResults();
  });

  return (
    <main className="w-full h-full flex justify-evenly items-center">
      <section className="w-1/2 h-full p-4 flex flex-col justify-start items-center">
        {gameResults.length > 0 &&
          gameResults?.map((gameList, index) => {
            return (
              <Row
                key={gameList.gameresult_id}
                gameResultList={gameList}
                onClick={setCode}
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
