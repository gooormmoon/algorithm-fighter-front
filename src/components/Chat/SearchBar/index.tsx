import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "../../../store/store";
const SearchBar = ({ query }: { query?: string }) => {
  const { theme } = useTheme();
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
    <form
      onSubmit={handleSearchSubmit}
      className={`${
        theme === "dark"
          ? "border-white/55 text-white/55"
          : "border-chat_border text-chat_border"
      } bg-transparent flex gap-2 border-b-2 drop-shadow-2xl shadow-2xl`}
    >
      <input
        className="bg-transparent outline-none "
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="검색"
      />
      <button
        type="submit"
        className={`${
          theme === "dark" ? "text-white/55" : "text-chat_border_dark"
        }`}
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
