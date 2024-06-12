import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Profile from "./Profile";
import Button from "../../Common/Button";

const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <header
      className={`w-full h-[70px] flex justify-between items-center gap-12 p-4 shadow-xl ${
        theme === "dark"
          ? "bg-secondary text-white border-white"
          : "bg-white text-secondary border-secondary"
      }`}
    >
      <ul className="w-4/5 h-full flex gap-12 items-center">
        <li className="mr-12">로고</li>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/">게임</Link>
          {/* 클릭하면 모달창나오게 */}
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
    </header>
  );
};

export default Header;
