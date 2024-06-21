import React, { useState } from "react";
import ProfileIcon from "../../Common/ProfileIcon";

const ChatMessage = () => {
  return (
    <div className={`text-primary flex justify-start gap-1 items-center`}>
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
