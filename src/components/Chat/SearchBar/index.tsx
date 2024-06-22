import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "../../../store/store";
const SearchBar = ({ query }: { query?: string }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //query api
    setSearchQuery("");
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#212C4D] text-white/55"
          : "bg-gray-200 text-chat_border"
      }  w-1/3 flex gap-1 rounded-sm  justify-between px-2 min-w-40`}
    >
      <input
        className={`bg-transparent outline-none w-4/5 pl-1`}
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="검색"
      />
      <button
        type="submit"
        onClick={handleSearchSubmit}
        className={`${
          theme === "dark" ? "text-oc_white" : "text-chat_border_dark"
        }`}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
