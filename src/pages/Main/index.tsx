import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
import cx from "classnames";
import Chat from "../../components/Chat";
import RoomList from "./RoomList";
import { CreateModal } from "../Game/GameModal";
import { useMe, useStomp, useTheme } from "../../store/store";
import { useMount } from "react-use";

const Main: React.FC = () => {
  const { me, loggedIn } = useMe();
  const navigate = useNavigate();
  const [createGame, setCreateGame] = useState(false);
  const [enterGame, setEnterGame] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(10);

  const [gameSetting, setGameSetting] = useState({
    title: "",
    difficulty: 0,
    timer: 10,
  });

  // const [stompClient, setStompClient] = useState<StompJS.Client | null>(null);
  const { gameClient, chatClient } = useStomp();

  useMount(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      // const stomp = getClient();
      // setStompClient(stomp);
      // stomp.activate();
    }
  });
  useEffect(() => {
    if (createGame && gameClient) {
      gameClient.onConnect = () => {
        console.log("WebSocket 연결이 열렸습니다.");
      };
    }
  }, [createGame, gameClient]);
  const toggleModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
  ) => {
    modalSetter(isOpen);
  };

  const handleCreateSubmit = (
    title: string,
    difficulty: number,
    timer: number
  ) => {
    setSelectedDifficulty(difficulty);
    setSelectedNumber(timer);
    toggleModal(setCreateGame, false);
  };

  return (
    <main className={styles.mainLayout}>
      <div className={styles.column}>
        <div className={cx(styles.box, styles.list)}>
          <RoomList />
        </div>
      </div>

      <div className={styles.column}>
        <div className={cx(styles.box, styles.chat)}>
          <Chat />
        </div>
        <div
          className={cx(
            styles.box,
            styles.create,
            "flex justify-between gap-12"
          )}
        >
          <button
            className="w-1/2 h-full bg-primary text-[36px] text-white font-semibold rounded-lg shadow-lg drop-shadow-lg hover:-translate-y-2 transition-all ease-in-out"
            onClick={() => toggleModal(setCreateGame, true)}
          >
            게임 생성
          </button>
          <button className="w-1/2 h-full bg-tertiary text-[36px] text-white font-semibold  rounded-lg shadow-lg drop-shadow-lg hover:-translate-y-2 transition-all ease-in-out">
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
