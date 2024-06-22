import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./main.module.scss";
import cx from "classnames";
import Chat from "../../components/Chat";
import RoomList from "./RoomList";
import { CreateModal } from "../Game/GameModal";
import { useMe, useRooms, useStomp, useTheme } from "../../store/store";
import { useMount } from "react-use";
import { createGame, sendGetRooms } from "../../api/Game";

const Main: React.FC = () => {
  const { me, loggedIn } = useMe();
  const { rooms } = useRooms();
  const navigate = useNavigate();
  const [createGameModal, setCreateGameModal] = useState(false);
  const [enterGame, setEnterGame] = useState(false);
  const { gameClient, chatClient } = useStomp();
  const { theme } = useTheme();

  // useMount(() => {

  // });
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      if (gameClient === null) {
        console.log("null");
      } else {
        console.log("연결됨? ", gameClient.connected);
      }
    }
    // if (gameClient?.connected) {
    //   // sendGetRooms(gameClient, {
    //   //   message: "give me room list",
    //   // });

    // }
  }, []);

  const toggleModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
  ) => {
    modalSetter(isOpen);
  };

  // useEffect(() => {
  //   toggleModal(setCreateGameModal, false);
  //   if (gameClient?.connected && gameSettings.title !== "") {
  //     createGame(gameClient, gameSettings);
  //   }
  // }, [gameSettings]);

  return (
    <main className={styles.mainLayout}>
      <div className={styles.column}>
        <div
          className={cx(
            styles.box,
            styles.list,
            `${theme === "light" && "border border-gray-300"}`
          )}
        >
          <RoomList rooms={rooms} />
        </div>
      </div>

      <div className={styles.column}>
        <div
          className={cx(
            styles.box,
            styles.chat,
            `${theme === "light" && "border border-gray-300"}`
          )}
        >
          <Chat roomId="global" />
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
            onClick={() => toggleModal(setCreateGameModal, true)}
          >
            게임 생성
          </button>
          <button className="w-1/2 h-full bg-tertiary text-[36px] text-white font-semibold  rounded-lg shadow-lg drop-shadow-lg hover:-translate-y-2 transition-all ease-in-out">
            게임 시작
          </button>
        </div>
      </div>
      {createGameModal && (
        <CreateModal
          isOpen={createGameModal}
          onClose={() => toggleModal(setCreateGameModal, false)}
          // onSubmit={setGameSettings}
        />
      )}
    </main>
  );
};

export default Main;
