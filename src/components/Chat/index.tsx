import React, { useEffect, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import SearchBar from "./SearchBar";
import InputBar from "./InputBar";
import { useGlobalChat, useMe, useTheme, useStomp } from "../../store/store";
import { useMount } from "react-use";
import { Client } from "@stomp/stompjs";

export interface GameMessage {
  chatroom_id: string;
  content: string;
  type: string;
  sender_id: string;
  created_date: string;
}

const Chat = ({ roomId }: { roomId: string }) => {
  const { theme } = useTheme();
  const { me } = useMe();
  const { chatClient } = useStomp();
  const { messages } = useGlobalChat();
  const [gameMessage, setGameMessage] = useState<GameMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (chatClient?.connected && roomId !== "global") {
      chatClient.unsubscribe("gameChat");
      chatClient.subscribe(
        `/topic/room/${roomId}`,
        (message) => {
          // setGameMessage(JSON.parse(message.body));
          const newMessage = JSON.parse(message.body);
          setGameMessage((prevMessages) => [...prevMessages, newMessage]);
        },
        {
          id: "gameChat",
        }
      );
    }
  });
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section
      className={`w-full h-full gap-2 flex flex-col rounded-lg justify-between items-center  ${
        theme === "dark" ? "bg-dark_box" : ""
      }`}
    >
      <div
        className={`p-6 w-full h-[40px] bg-transparent flex justify-between items-center border-b ${
          theme === "dark" ? "border-oc_white" : "border-gray-300"
        }`}
      >
        <span>전체</span>
        <SearchBar />
      </div>
      <div className="w-full h-full p-4 flex flex-col items-start justify-start gap-1 overflow-scroll">
        {roomId === "global"
          ? messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg}
                // nickname={me.nickname}
              />
            ))
          : gameMessage.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg}
                // nickname={me.nickname}
              />
            ))}
        <div ref={messagesEndRef} />
      </div>
      <div
        className={`px-2 w-full h-[60px] bg-transparent flex items-center border-t  ${
          theme === "dark" ? "border-oc_white" : "border-gray-300"
        }`}
      >
        <InputBar roomId={roomId} />
      </div>
    </section>
  );
};

export default Chat;
