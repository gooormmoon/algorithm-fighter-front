import React, { useState } from "react";

const InputBar = () => {
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
    <form onSubmit={handleMessageSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="메시지"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default InputBar;
