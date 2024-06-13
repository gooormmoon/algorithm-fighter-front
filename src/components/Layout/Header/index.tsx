import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Profile from "./Profile";
import Button from "../../Common/button/Button";
import CreateModal from "../../../GameModal/CreateModal/CreateModal";

const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <header
      className={`w-full h-[70px] flex justify-between items-center gap-12 p-4 shadow-xl ${
        theme === "dark"
          ? "bg-[#213363] text-white border-white"
          : "bg-white text-[#213363] border-[#213363]"
      }`}
    >
      <ul className="w-4/5 h-full flex gap-12 items-center">
        <li className="mr-12">로고</li>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <button onClick={openModalHandler}>게임</button>
        </li>
        <li>
          <Link to="/myRepository">내 저장소</Link>
        </li>
        <li>
          <Link to="/mypage">마이 페이지</Link>
        </li>
      </ul>
      <ul className="h-full flex gap-4 items-center">
        <li>구름달님(예시)</li>
        <li>
          <button onClick={() => toggleTheme()}>
            {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </li>
        <li>
          <button onClick={() => setShowProfile((prev) => !prev)}>
            <AccountCircleIcon />
          </button>
          {showProfile && <Profile />}
        </li>
        <li>
          <ForumIcon />
        </li>
        <li>
          <Button
            type="button"
            onClick={() => navigate("/login")}
            size="medium_small_radius"
            color="secondary_border"
            textColor="secondary_color_font"
            name="로그인"
          />
        </li>
      </ul>
      {isModalOpen && <CreateModal isOpen={isModalOpen} onClose={closeModalHandler} />}
    </header>
  );
};

export default Header;
