import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.scss";
import Chat from "../../components/Chat";
import RoomList from "./RoomList";
import { CreateModal } from "../Game/GameModal";

const Main: React.FC = () => {
  const [createGame, setCreateGame] = useState(false);
  const [enterGame, setEnterGame] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("lv0");
  const [selectedNumber, setSelectedNumber] = useState("10 minute");
  const navigate = useNavigate();
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
    <main className="main-layout">
      <div className="left-column">
        <div className="box list">
          <RoomList />
        </div>
      </div>

      <div className="right-column">
        <div className="box chat">
          <Chat />
        </div>
        <div className="box create flex justify-between gap-4">
          <button
            className="w-1/2 h-1/2 bg-primary text-[36px] text-white font-semibold rounded-2xl shadow-lg drop-shadow-lg hover:-translate-y-2 transition-all ease-in-out"
            onClick={() => toggleModal(setCreateGame, true)}
          >
            게임 생성
          </button>
          <button className="w-1/2 h-1/2 bg-tertiary text-[36px] text-white font-semibold  rounded-2xl shadow-lg drop-shadow-lg hover:-translate-y-2 transition-all ease-in-out">
            게임 시작
          </button>
        </div>
      </div>
      {createGame && (
        <CreateModal
          isOpen={createGame}
          onClose={() => toggleModal(setCreateGame, false)}
          onSubmit={handleCreateSubmit}
        />
      )}
    </main>
  );
};

export default Main;
