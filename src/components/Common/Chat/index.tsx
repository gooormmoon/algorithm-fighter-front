import React from "react";
import ChatMessage from "../ChatMessage";

const Chat = () => {
  return (
    <section className="w-full h-full p-8 bg-white flex flex-col ">
      <div className="w-full h-[40px] bg-gray-300 flex justify-between ">
        <span>전체</span>
        <span>검색폼</span>
      </div>
      <div className="w-full h-full py-2 flex flex-col items-start gap-2">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
      <div className="w-full h-[40px] bg-gray-300">입력폼</div>
    </section>
  );
};

export default Chat;
