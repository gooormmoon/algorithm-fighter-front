import React from "react";
import ChatMessage from "./ChatMessage";
import SearchBar from "./SearchBar";
import InputBar from "./InputBar";
import { useTheme } from "../../store/store";

const Chat = () => {
  const { theme } = useTheme();
  return (
    <section className="w-full h-full p-8  flex flex-col bg-black/5 rounded-xl">
      <div className="px-2 w-full h-[40px] bg-gray-300 flex justify-between ">
        <span>전체</span>
        <SearchBar />
      </div>
      <div className="w-full h-full py-2 flex flex-col items-start gap-2">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
      <div className="w-full h-[40px] bg-gray-300">
        <InputBar />
      </div>
    </section>
  );
};

export default Chat;
