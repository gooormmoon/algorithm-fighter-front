import React, { useState } from "react";
import ProfileIcon from "../../Common/ProfileIcon";

const textColors = [
  "text-red-500",
  "text-orange-500",
  "text-yellow-500",
  "text-green-500",
  "text-blue-500",
  "text-purple-500",
];
const pickTextColors = () => {
  return textColors[Math.floor(Math.random() * textColors.length)];
};
const ChatMessage = () => {
  const [color, setColor] = useState(pickTextColors());
  // const [bgColor, setBgColor] = useState(pickColors("bg-"));
  return (
    <div className={`text-primary flex justify-start gap-1 items-center`}>
      {/* <div
        className={`${color} w-[88px] flex justify-center items-center p-1 rounded gap-1 `}
      >
        <ProfileIcon size="small" />
        <span className="mr-1 text-white">구름달</span>
      </div> */}
      <div
        className={`w-[92px] flex justify-center items-center p-1 rounded gap-1`}
      >
        <ProfileIcon size="small" />
        <span className="">구름달</span>
        <span>:</span>
      </div>

      <span className="">메세지 테스트테스트테스트</span>
    </div>
  );
};

export default ChatMessage;
