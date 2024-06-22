import React, { useState } from "react";
import ProfileIcon from "../../Common/ProfileIcon";
import { GameMessage } from "..";

const ChatMessage = ({ message }: { message: GameMessage }) => {
  return (
    <div className={`text-primary flex justify-start gap-1 items-center`}>
      <div
        className={`w-[92px] flex justify-center items-center p-1 rounded gap-1`}
      >
        <ProfileIcon size='small' />
        {/* <span className="">{nickname}</span> */}
        <span>:</span>
      </div>

      <span className=''>{message.content}</span>
    </div>
  );
};

export default ChatMessage;
