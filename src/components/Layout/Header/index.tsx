import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Profile from "./Profile";
import { CreateModal, EnterModal } from "../../../pages/Game/GameModal";
import { Button, ProfileIcon } from "../../Common";
import { useTheme } from "../../../store/store";
interface pathType {
  path: string;
  name: string;
}
const paths: pathType[] = [
  { path: "/", name: "홈" },
  { path: "/myRepository", name: "내 저장소" },
  { path: "/mypage", name: "마이 페이지" },
];
const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const { theme, changeTheme } = useTheme();
  const [hover, setHover] = useState(false);

  return (
    <header
      className={`w-full h-[70px] flex justify-between items-center gap-12 p-4 shadow-xl ${
        theme === "dark"
          ? "bg-gradient-to-r from-teal-950 to-secondary text-gray-400 "
          : "bg-white text-gray-400  "
      }`}
    >
      <ul className="w-4/5 h-full flex gap-12 items-center ">
        <li className="mr-12">로고</li>
        {paths.map(({ path, name }: pathType, index: number) => {
          return (
            <li
              key={index}
              className={`transition-colors duration-500 ${
                theme === "dark" ? "hover:text-white" : "hover:text-secondary "
              } ${
                pathname === path &&
                (theme === "dark" ? "text-white" : "text-secondary")
              }`}
            >
              <Link to={path}>{name}</Link>
            </li>
          );
        })}

        {/* <li>
          <button onClick={() => toggleModal(setEnterGame, true)}>
            게임 참가
          </button>
        </li>
        <li>
          <button onClick={() => toggleModal(setCreateGame, true)}>
            게임 생성
          </button>
        </li> */}
      </ul>
      <ul className="h-full flex gap-4 justify-center items-center">
        <li
          className={`w-[32px] h-[32px] flex justify-center items-center text-white ${
            theme === "dark" ? "text-white" : "text-secondary"
          }`}
        >
          <button
            onClick={() => changeTheme()}
            onMouseOver={(prev) => setHover(true)}
            onMouseOut={(prev) => setHover(false)}
            className="transition-all ease-in-out"
          >
            {theme === "dark" && (hover ? <LightModeIcon /> : <DarkModeIcon />)}
            {theme === "light" &&
              (hover ? <DarkModeIcon /> : <LightModeIcon />)}
          </button>
        </li>
        <li className="w-[32px] h-[32px] flex justify-center items-center">
          <button onClick={() => setShowProfile((prev) => !prev)}>
            <ProfileIcon size="medium" />
          </button>
          {showProfile && <Profile />}
        </li>
      </ul>
    </header>
  );
};

export default Header;
