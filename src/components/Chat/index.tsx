import React from "react";
import ChatMessage from "./ChatMessage";
import SearchBar from "./SearchBar";
import InputBar from "./InputBar";
import { useTheme } from "../../store/store";

const Chat = () => {
  const { theme } = useTheme();
  return (
    <section
      className={`w-full h-full gap-2 flex flex-col rounded-lg justify-between items-center  ${
        theme === "dark" ? "bg-dark_box" : ""
      }`}
    >
      <div
        className={`p-6 w-full h-[40px] bg-transparent flex justify-between items-center border-b ${
          theme === "dark" ? "border-oc_white" : "border-secondary"
        }`}
      >
        <span>전체</span>
        <SearchBar />
      </div>
      <div className="w-full h-full p-4 flex flex-col items-start justify-start gap-1 overflow-scroll">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
      <div
        className={`px-2 w-full h-[60px] bg-transparent flex items-center border-t  ${
          theme === "dark" ? "border-oc_white" : "border-secondary"
        }`}
      >
        <InputBar />
      </div>
    </section>
  );
};

export default Chat;
