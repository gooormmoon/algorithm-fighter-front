import React, { useEffect, useState } from "react";
import { useMount } from "react-use";
import { getUser } from "../../../api/Users";
import { useMe, useTheme } from "../../../store/store";
import { ResultListType } from "..";
import { ProfileIcon } from "../../../components/Common";
import { getGameDetail } from "../../../api/MyPage";
type ResultType = {
  title: string;
  running_time: number;
  gameresult_id: number;
  host_id: string;
  guest_id: string;
  host_code_content: string;
  guest_code_content: string;
  host_code_language: string;
  guest_code_language: string;
  game_over_type: string;
};

type ResultDetailType = {
  id: string;
  nickname: string;
  profile_image_url: string;
  code: string;
  // result: string;
  type: string;
  code_language: string;
};
const Row = ({
  //   key,
  gameResultList,
  onClick,
}: {
  //   key: number;
  gameResultList: ResultListType;
  onClick: (value: string) => void;
}) => {
  const { me } = useMe();
  const { theme } = useTheme();
  const [gameResult, setGameResult] = useState<ResultType>({
    title: gameResultList.title,
    running_time: gameResultList.running_time,
    gameresult_id: gameResultList.gameresult_id,
    host_id: "",
    guest_id: "",
    host_code_content: "",
    guest_code_content: "",
    host_code_language: "",
    guest_code_language: "",
    game_over_type: "",
  });
  const [myResult, setMyResult] = useState<ResultDetailType>({
    id: "",
    nickname: "",
    profile_image_url: "",
    code: "",
    // result: "",
    type: "",
    code_language: "",
  });
  const [competitorResult, setCompetitorResult] = useState<ResultDetailType>({
    id: "",
    nickname: "",
    profile_image_url: "",
    code: "",
    // result: "",
    type: "",
    code_language: "",
  });
  const getGameInfo = async () => {
    try {
      const response = await getGameDetail(gameResult.gameresult_id);
      if (response.status === 200) {
        const data = response.data.data;
        setGameResult((prev: ResultType) => ({
          ...prev,
          host_id: data.host_id,
          host_code_content: data.host_code_content,
          host_code_language: data.host_code_language,
          guest_code_language: data.guest_code_language,
          guest_id: data.guest_id,
          guest_code_content: data.guest_code_content,
          game_over_type: data.game_over_type,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(gameResult);
    console.log(competitorResult);
  }, [gameResult, competitorResult]);
  const getUserInfo = async () => {
    try {
      setMyResult((prev) => ({
        ...prev,
        nickname: me?.nickname,
        profile_image_url: me?.profile_image_url,
      }));
      // const responseMe = await getUser(me?.id);

      const responseCompetitior = await getUser(competitorResult?.id);

      // const responseMe = {
      //   data: {
      //     id: "host@test.com",
      //     nickname: "host",
      //     profile_image_url: "PrincessIcon",
      //   },
      // };

      // const responseCompetitior = {
      //   data: {
      //     id: "sjj2@naver.com",
      //     nickname: "sjj2",
      //     profile_image_url: "DevilIcon",
      //   },
      // };

      setCompetitorResult((prev) => ({
        ...prev,
        nickname: responseCompetitior.data.nickname,
        profile_image_url: responseCompetitior.data.profile_image_url,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  useMount(() => {
    getGameInfo();
  });
  useEffect(() => {
    if (gameResult.host_id !== "") {
      if (me?.id === gameResult.host_id) {
        setMyResult((prev) => ({
          ...prev,
          id: gameResult.host_id,
          code: gameResult.host_code_content,
          code_language: gameResult.host_code_language,
          type: gameResult.game_over_type,
        }));
        setCompetitorResult((prev) => ({
          ...prev,
          id: gameResult.guest_id,
          code: gameResult.guest_code_content,
          code_language: gameResult.guest_code_language,
          type: gameResult.game_over_type === "WIN" ? "LOSE" : "TimeOver",
        }));
      } else {
        setMyResult((prev) => ({
          ...prev,
          id: gameResult.guest_id,
          code: gameResult.guest_code_content,
          code_language: gameResult.guest_code_language,
        }));
        setCompetitorResult((prev) => ({
          ...prev,
          id: gameResult.host_id,
          code: gameResult.host_code_content,
          code_language: gameResult.host_code_language,
          type: gameResult.game_over_type === "WIN" ? "LOSE" : "TimeOver",
        }));
      }

      getUserInfo();
    }
  }, [gameResult]);
  return (
    <div
      //   key={gameResult.gameresult_id}s
      className={`w-4/5 h-[140px] flex flex-col justify-start items-center gap-4 py-4 rounded-md  border-gray-300 border  ${
        // theme === "dark"
        //   ? "border bg-dark_box hover:bg-primary/40 border-oc_white"
        //   : "border hover:bg-[#DFE1E9]  border-gray-300"
        myResult?.type === "WIN"
          ? "bg-blue-500 hover:bg-blue-500/80"
          : myResult?.type === "LOSE"
          ? "bg-red hover:bg-red/80"
          : "bg-green hover:bg-green/80"
      }`}
    >
      <div className="w-full h-[20px] flex items-center gap-10 px-2">
        <span className="font-bold text-lg">{`문제 : ${gameResult?.title}`}</span>
        <span>/</span>
        <span>{`진행 시간: ${String(
          gameResult?.running_time / 1000
        )} sec`}</span>
      </div>
      <div className="w-full flex ">
        <div className="w-[180px] flex justify-center items-center text-3xl">
          {myResult?.type}
        </div>
        <div className="w-2/5  flex  justify-center items-start gap-2 border-r">
          <ProfileIcon size="mediumLarge" src={myResult?.profile_image_url} />
          <div className="flex flex-col justify-start items-start">
            <p>{`${myResult?.id}`}</p>
            {/* <p>{`언어: ${myResult?.code_language}`}</p> */}
            <p
              className="cursor-pointer font-semibold"
              onClick={() => onClick(myResult?.code)}
            >
              코드 보기
            </p>
          </div>
        </div>
        <div className="w-2/5 flex justify-center items-center gap-2">
          <ProfileIcon
            size="mediumLarge"
            src={competitorResult?.profile_image_url}
          />
          <div className="flex flex-col justify-start items-start ">
            <p>{`${competitorResult?.id}`}</p>
            {/* <p>{`언어: ${competitorResult?.code_language}`}</p> */}
            <p
              className="cursor-pointer font-semibold"
              onClick={() => onClick(competitorResult?.code)}
            >
              코드 보기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
