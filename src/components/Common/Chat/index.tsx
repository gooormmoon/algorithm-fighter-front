import React from "react";

const Chat = () => {
  return (
    <section className="w-full h-full p-8 bg-white flex flex-col ">
      <div className="w-full h-[40px] bg-gray-300 flex justify-between ">
        <span>전체</span>
        <span>검색폼</span>
      </div>
      <div className="w-full h-full">채팅 메시지</div>
      <div className="w-full h-[40px] bg-gray-300">입력폼</div>
    </section>
  );
};

export default Chat;
