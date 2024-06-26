import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./main.module.scss";
import cx from "classnames";
import Chat from "../../components/Chat";
import RoomList from "./RoomList";
import { CreateModal } from "../Game/GameModal";
import {
  useGlobalChat,
  useMe,
  useRooms,
  useStomp,
  useTheme,
} from "../../store/store";
import { useMount } from "react-use";
import { createGame, createGameClient, sendGetRooms } from "../../api/Game";
import * as StompJs from "@stomp/stompjs";
import { toast } from "react-toastify";
import Timer from "../Game/Timer/timer";
import { createChatClient } from "../../api/Chat";

const Main: React.FC = () => {
  const { me, loggedIn } = useMe();
  const { rooms, setRooms } = useRooms();
  const navigate = useNavigate();
  const [createGameModal, setCreateGameModal] = useState(false);
  const [enterGame, setEnterGame] = useState(false);
  const { gameClient, chatClient, setGameClient, setChatClient } = useStomp();
  const { theme } = useTheme();
  const { messages, setMessages, resetMessages } = useGlobalChat();

  useMount(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      if (gameClient === null || !gameClient?.connected) {
        const newGameClient = createGameClient();
        newGameClient?.activate();
        newGameClient.onConnect = (frame: any) => {
          console.log("connected");
          newGameClient?.unsubscribe("rooms");
          newGameClient?.subscribe(
            "/user/queue/game/sessions",
            (message) => {
              const data = JSON.parse(message.body);
              console.log(data);
              if (data.rooms) {
                setRooms(data.rooms);
                // gameClient.unsubscribe("/user/queue/game/sessions");
              }
            },
            { id: "rooms" }
          );
          const message = JSON.stringify({
            message: "give me room list",
          });
          newGameClient?.publish({
            destination: "/app/game/sessions",
            body: message,
          });

          // newGameClient?.unsubscribe("joinGame");
          newGameClient?.subscribe(
            "/user/queue/game/join",
            (message) => {
              const data = JSON.parse(message.body);
              console.log("메세지옴");
              if (data.host_id) {
                //생성하고 콜백함수
                navigate(`/wait/${data.host_id}`, {
                  state: {
                    host: `${data.host}`,
                    host_id: `${data.host_id}`,
                    players: data.players,
                    ready_players: data.ready_players,
                    max_player: data.max_player,
                    problem_level: data.problem_level,
                    timer_time: data.timer_time,
                    title: data.title,
                    chatroom_id: data.chatroom_id,
                  },
                });
              } else {
                alert(data.msg);
              }
            },
            { id: "joinGame" }
          );
          setGameClient(newGameClient);
        };

        // toast.success("게임 세션 재연결");
      } else {
        console.log("연결됨? ", gameClient.connected);
      }

      if (chatClient === null || !chatClient?.connected) {
        const newChatClient = createChatClient();
        newChatClient.activate();
        newChatClient.onConnect = (frame: any) => {
          newChatClient.unsubscribe("globalChat");
          newChatClient.subscribe(
            "/topic/room/global",
            (message) => {
              const receivedMessage = JSON.parse(message.body);
              setMessages({
                ...receivedMessage,
                nickname: me.nickname, // nickname 추가
              });
            },
            {
              id: "globalChat",
            }
          );
          setChatClient(newChatClient);
          resetMessages();
        };
      }
    }
  });

  const toggleModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
  ) => {
    modalSetter(isOpen);
  };

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
