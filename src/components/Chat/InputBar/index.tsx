import React, { useState } from "react";
import { Button } from "../../Common";

const InputBar = () => {
  const [message, setMessage] = useState<string>("");
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //api
    setMessage("");
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
        className={`bg-transparent w-full h-3/4 outline-none zresize-none `}
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
