import React, { useState } from 'react';

interface ChatProps {
  onSearch: (query: string) => void;
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ onSearch, onSendMessage }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="검색"
        />
        <button type="submit">Search</button>
      </form>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="메시지"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;