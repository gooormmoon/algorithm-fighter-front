import React from "react";
import { useStomp, useTheme } from "../../../store/store";
import { useMount } from "react-use";
import { joinGame } from "../../../api/Game";
import { useNavigate } from "react-router-dom";
import { Room } from "../../../store/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type room = {
  host_id: string;
  host: string;
  title: string;
  max_player: number;
  problem_level: number;
  timer_time: number;
  is_started: boolean;
};
const RoomList = ({
  rooms,
  className,
  hover,
}: {
  rooms: Room[];
  className?: string;
  hover?: string;
}) => {
  const { theme } = useTheme();
  const { gameClient } = useStomp();
  const navigate = useNavigate();
  useMount(() => {
    if (gameClient?.connected) {
      gameClient.subscribe("/user/queue/game/session", (message) => {
        const data = JSON.parse(message.body);
        if (data.host && data.host_id) {
          //생성하고 콜백함수
          navigate(`/wait/${data.host_id}`, {
            state: {
              host: `${data.host}`,
              host_id: `${data.host_id}`,
              players: data.players,
              ready_player: data.ready_player,
              max_player: data.max_player,
              problem_level: data.problem_level,
              timer_time: data.timer_time,
              title: data.title,
              chat_room_id: data.chat_room_id,
            },
          });
          toast.success("게임에 성공적으로 참가했습니다!");
        } else {
          toast.error("게임 참가에 실패했습니다. 다시 시도해주세요.");
        }
      });
    }
  });
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // game연결되면 이 navigate는 없앨예정
    // navigate(`/wait/${"sfdsfsfd@123"}`, {
    //   state: {
    //     players: ["구름달"],
    //     ready_player: [],
    //     chat_room_id: "chatroomId",
    //     host_id: "sfdsfsfd@123",
    //     host: "구름달",
    //     title: "대결하실래요?",
    //     max_player: 2,
    //     level: 2,
    //     timer_time: 20,
    //     // is_started: true,
    //   },
    // });
    if (gameClient?.connected) {
      // joinGame(gameClient, {
      //   host_id: e.currentTarget.id,
      // });
      gameClient.publish({
        destination: "/app/game/join",
        body: JSON.stringify({
          host_id: e.currentTarget.id,
        }),
      });
    } else {
      toast.error("게임 서버에 연결되지 않았습니다.");
    }
  };
  return (
    <table
      className={`w-full h-full flex flex-col justify-start items-start rounded-lg  drop-shadow-xl ${
        theme === "dark" && "bg-dark_box"
      }`}
    >
      <thead className="w-full flex flex-col">
        <tr className="w-full flex flex-start items-center bg-[#212C4D] text-white h-8 rounded-t-lg">
          <th className="w-[10%]">No.</th>
          <th className="w-[15%]">닉네임</th>
          <th className="w-[25%]">방 제목</th>
          <th className="w-[10%]">인원</th>
          <th className="w-[10%]">난이도</th>
          <th className="w-[15%]"> 타이머</th>
          <th className="w-[15%]"> 상태</th>
        </tr>
      </thead>
      <tbody className="mt-2 w-full h-full flex flex-col justify-start  items-center border-collapse">
        {rooms.map(
          (
            {
              host_id,
              host,
              title,
              max_player,
              problem_level,
              timer_time,
              started,
              players,
            },
            index
          ) => {
            return (
              <tr
                id={host_id}
                onClick={onClick}
                key={host_id}
                className={`w-full flex justify-start items-center h-8 text-center border-b  border-x-0 cursor-pointer ${
                  theme === "dark"
                    ? "hover:bg-secondary/70 border-oc_white"
                    : "hover:bg-[#DFE1E9]  border-gray-300"
                }`}
              >
                <td className="w-[10%]">{index}</td>
                <td className="w-[15%]">{host}</td>
                <td className="w-[25%]">{title}</td>
                <td className="w-[10%]">{`${players.length}/${max_player}`}</td>
                <td className="w-[10%]">{`lv.${problem_level}`}</td>
                <td className="w-[15%]">{`${timer_time} min`}</td>
                <td className="w-[15%]"> {started ? "게임중" : "대기중"}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default RoomList;
