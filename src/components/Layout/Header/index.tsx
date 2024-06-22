import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Profile from "./Profile";
import { ProfileIcon } from "../../Common";
import { useTheme } from "../../../store/store";
import Lightmode_logo from "../../../Lightmode_logo.png";
import Darkmode_logo from "../../../Darkmode_logo.png";
interface pathType {
  path: string;
  name: string;
}
const paths: pathType[] = [
  { path: "/", name: "홈" },
  { path: "/setting", name: "프로필 설정" },
];
const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, changeTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <header
      className={`w-full h-[70px] flex justify-between items-center gap-12 p-4 shadow-xl ${
        theme === "dark"
          ? "bg-secondary text-gray-400 border-b border-[#101935] "
          : "bg-white text-gray-400  "
      }`}
    >
      <ul className="w-4/5 h-full flex gap-12 items-center ">
        <li>
          <div
            className={`w-[100px] h-full
         relative overflow-hidden flex justify-center cursor-pointer`}
            onClick={() => navigate("/")}
          >
            {theme === "dark" ? (
              <img
                alt="dark_logo"
                src={Darkmode_logo}
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                alt="light_logo"
                src={Lightmode_logo}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </li>
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
      </ul>
      <ul className="h-full flex gap-4 justify-center items-center">
        <li
          className={`w-[32px] h-[32px] flex justify-center items-center  ${
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
