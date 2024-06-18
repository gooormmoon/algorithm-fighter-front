import React from "react";
import { useTheme } from "../../../store/store";

const test = [
  {
    id: 1,
    title: "대결하실래요? ",
    people: "2/2",
    state: "게임중",
    nickname: "westpearl",
  },
  {
    id: 2,
    title: "????? ",
    people: "1/2",
    state: "대기중",
    nickname: "nviea",
  },
];
const RoomList = ({
  className,
  hover,
}: {
  className?: string;
  hover?: string;
}) => {
  const { theme } = useTheme();
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <table
      className={`w-full h-full flex flex-col justify-start items-start rounded-lg shadow-xl drop-shadow-xl ${
        theme === "dark" && "bg-dark_box"
      }`}
    >
      <thead className="w-full flex flex-col">
        <tr className="w-full flex flex-start items-center bg-[#212C4D] text-white h-8 rounded-t-lg">
          <th className="w-1/6">No.</th>
          <th className="w-1/6">닉네임</th>
          <th className="w-1/3">방 제목</th>
          <th className="w-1/6">인원</th>
          <th className="w-1/6"> 상태</th>
        </tr>
      </thead>
      <tbody className="mt-2 w-full h-full flex flex-col justify-start  items-center border-collapse">
        {test.map(({ id, title, people, state, nickname }, index) => {
          return (
            <tr
              onClick={onClick}
              key={id}
              className={`w-full flex justify-center items-center h-8 text-center border-b  border-x-0 cursor-pointer ${
                theme === "dark"
                  ? "hover:bg-secondary/70 border-oc_white"
                  : "hover:bg-[#DFE1E9] border-border"
              }`}
            >
              <td className="w-1/6">{index}</td>
              <td className="w-1/6">{nickname}</td>
              <td className="w-1/3">{title}</td>
              <td className="w-1/6">{people}</td>
              <td className="w-1/6"> {state}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RoomList;
