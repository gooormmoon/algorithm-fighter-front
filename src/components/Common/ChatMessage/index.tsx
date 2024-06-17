import React from "react";
import ProfileIcon from "../ProfileIcon";

const ChatMessage = () => {
  return (
    <div className="flex justify-start gap-2">
      <ProfileIcon size="small" />
      <span>구름달</span>
      <span>메세지 테스트테스트테스트</span>
    </div>
  );
};

export default ChatMessage;
