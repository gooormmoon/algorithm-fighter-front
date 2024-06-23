import React, { useState } from "react";
import { Button } from "../../Common";
import { sendMessage } from "../../../api/Chat";
import { useStomp, useMe, useGlobalChat } from "../../../store/store";
import * as StompJs from "@stomp/stompjs";
import { createChatClient } from "../../../api/Chat";
import { createGameClient } from "../../../api/Game";

const InputBar = ({ roomId }: { roomId: string }) => {
  const [message, setMessage] = useState<string>("");
  const { chatClient, setChatClient } = useStomp();
  const { setMessages } = useGlobalChat();
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatClient?.connected) {
      try {
        sendMessage(chatClient, {
          chatroom_id: roomId,
          content: message,
          type: "TALK",
        });
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else {
      console.log("Chat client is not connected");

      const chatClient: StompJs.Client = createChatClient();
      chatClient.activate();
      chatClient.onConnect = (frame: any) => {
        chatClient.unsubscribe("globalChat");
        chatClient.subscribe(
          `/topic/room/global`,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            setMessages({
              ...receivedMessage,
              // nickname: myInfo.nickname, // nickname 추가
            });
          },
          {
            id: "globalChat",
          }
        );
        setChatClient(chatClient);
      };
    }
  };

  return (
    <form
      name="inputForm"
      onSubmit={handleMessageSubmit}
      className="w-full h-full px-4 bg-transparent flex justify-between items-center gap-2"
    >
      <input
        value={message}
        onChange={handleMessageChange}
        className={`bg-transparent w-full h-3/4 outline-none resize-none `}
        placeholder="메시지를 입력하세요"
      />
      <Button
        type="submit"
        size="small_radius"
        color="chat"
        textColor="primary_font"
        name="SEND"
      />
    </form>
  );
};
export default InputBar;
