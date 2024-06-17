import React, { useState } from "react";
import { Button } from "../../Common";
import { useTheme } from "../../../store/store";

const InputBar = () => {
  const { theme } = useTheme();
  const [message, setMessage] = useState<string>("");
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //api
    setMessage("");
  };
  return (
    <form
      onSubmit={handleMessageSubmit}
      className="w-full h-full px-4 bg-transparent flex justify-between items-center gap-2 shadow-2xl drop-shadow-2xl"
    >
      {/* <textarea
        cols={1}
        value={message}
        onChange={handleMessageChange}
        className="bg-transparent w-full h-3/4 outline-none resize-none"
        placeholder="메시지를 입력하세요"
      /> */}
      <input
        value={message}
        onChange={handleMessageChange}
        className={`bg-transparent w-full h-3/4 outline-none zresize-none `}
        placeholder="메시지를 입력하세요"
      />
      <Button
        type="submit"
        size="small"
        color="chat"
        textColor="primary_font"
        name="SEND"
      />
    </form>
  );
};

export default InputBar;
