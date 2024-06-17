import React, { useState } from "react";

const SearchBar = ({ query }: { query?: string }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //query api
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="검색"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
