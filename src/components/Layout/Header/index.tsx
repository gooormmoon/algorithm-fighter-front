import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Profile from "./Profile";
import { CreateModal, EnterModal } from "../../../pages/Game/GameModal";
import { Button, ProfileIcon } from "../../Common";
import { useTheme } from "../../../store/store";
const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { theme, changeTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [hover, setHover] = useState(false);
  const [CreateGame, setCreateGame] = useState(false);
  const [EnterGame, setEnterGame] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("lv0");
  const [selectedNumber, setSelectedNumber] = useState("10 minute");

  useEffect(() => {
    console.log("hover");
  }, [hover]);

  useEffect(() => {
    console.log(theme);
  }, [theme]);
  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const toggleModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
  ) => {
    modalSetter(isOpen);
  };

  const handleCreateSubmit = (
    code: string,
    difficulty: string,
    timer: string
  ) => {
    setInviteCode(code);
    setSelectedDifficulty(difficulty);
    setSelectedNumber(timer);
    toggleModal(setCreateGame, false);
    toggleModal(setEnterGame, true);
  };

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
          <button onClick={() => toggleModal(setEnterGame, true)}>
            게임 참가
          </button>
        </li>
        <li>
          <button onClick={() => toggleModal(setCreateGame, true)}>
            게임 생성
          </button>
        </li>
        <li>
          <Link to="/myRepository">내 저장소</Link>
        </li>
        <li>
          <Link to="/mypage">마이 페이지</Link>
        </li>
      </ul>
      <ul className="h-full flex gap-4 justify-center items-center">
        <li className="w-[32px] h-[32px] flex justify-center items-center">
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
      {CreateGame && (
        <CreateModal
          isOpen={CreateGame}
          onClose={() => toggleModal(setCreateGame, false)}
          onSubmit={handleCreateSubmit}
        />
      )}
      {EnterGame && (
        <EnterModal
          isOpen={EnterGame}
          onClose={() => toggleModal(setEnterGame, false)}
          inviteCode={inviteCode}
          selectedDifficulty={selectedDifficulty}
          selectedNumber={selectedNumber}
        />
      )}
    </header>
  );
};

export default Header;
