import React from "react";
import ChatMessage from "./ChatMessage";
import SearchBar from "./SearchBar";
import InputBar from "./InputBar";
import { useTheme } from "../../store/store";

const Chat = () => {
  const { theme } = useTheme();
  // "bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C] text-white/55"
  return (
    <section
      className={`w-full h-full gap-2 flex flex-col rounded-2xl justify-between items-center shadow-2xl drop-shadow-2xl ${
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
        <ChatMessage />
        <ChatMessage />
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

// ${
//   theme === "dark" ? "border-chat_border_dark" : ""
// }

export default Chat;
