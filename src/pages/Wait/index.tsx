import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./wait.module.scss";
import CompetitorProfile from "./CompetitorProfile";
import Chat from "../../components/Chat";
import { Dropdown, RadioButton } from "../../components/Common";
import { useMe, useStomp, useTheme } from "../../store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMount } from "react-use";
import { readyGame, startGame, updateGame } from "../../api/Game";

const numberOptions = [10, 20, 30, 40, 50, 60];

const Wait: React.FC = () => {
  const { me } = useMe();
  const { theme } = useTheme();
  const { gameClient } = useStomp();
  const navigate = useNavigate();
  const location = useLocation();
  const [roomInfo, setRoomInfo] = useState({ ...location.state });
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    location.state.problem_level
  );
  const [selectedNumber, setSelectedNumber] = useState(
    location.state.timer_time
  );

  const [disabled, setDisabled] = useState({
    readyButton: true,
    startButton: true,
  });

  useMount(() => {
    console.log(roomInfo);
    if (gameClient?.connected) {
      gameClient.subscribe("/user/queue/game/session", (message) => {
        const data = JSON.parse(message.body);
        if (data.host_id) {
          //게임 세션 업데이트
          setRoomInfo({ ...data });
          return;
        }
        if (data.AlgorithmProblem) {
          navigate(`/game/${roomInfo.host_id}`, {
            state: {
              roomInfo: { ...roomInfo },
              timer_time: data.timer_time,
              algorithmProblem: { ...data.AlgorithmProblem },
            },
          });
        }
      });
    }
  });
  useEffect(() => {
    setSelectedNumber(roomInfo.timer_time);
    setSelectedDifficulty(roomInfo.problem_level);
    setDisabled({
      readyButton: roomInfo.host_id === me.id && true,
      startButton:
        roomInfo.host_id !== me.id
          ? true
          : roomInfo.ready_player < 1
          ? true
          : false,
    });
  }, [roomInfo, me]);

  const onClickReady = () => {
    if (gameClient?.connected) {
      readyGame(gameClient);
    }
  };
  const onClickStart = () => {
    if (gameClient?.connected) {
      updateGame(gameClient, {
        problem_level: selectedDifficulty,
        timer_time: selectedNumber,
        title: roomInfo.title,
      });
      startGame(gameClient);
    }
  };
  return (
    <main className={styles.layout}>
      <section
        className={cx(
          styles.waitContainer,
          `${
            theme === "dark"
              ? "border border-oc_white"
              : "border border-[#e1e1e1]"
          }`
        )}
      >
        <div className={styles.waitHeader}>
          <div className={styles.header}>
            <button
              className="font-bold text-[20px]"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon />
            </button>
            <h1 className={styles.title}>{roomInfo.title}</h1>
          </div>

          <div className={styles.controls}>
            <div className={styles.radioWrapper}>
              <RadioButton
                selectedValue={selectedDifficulty}
                onChange={(value) => setSelectedDifficulty(value)}
              />
            </div>
            <Dropdown
              color={"text-secondary bg-white rounded flex font-semibold"}
              options={numberOptions}
              selectedValue={selectedNumber}
              onChange={(value) => setSelectedNumber(value)}
              showMinutes={true}
            />
          </div>
        </div>
        <div className={cx(styles.container, styles.top)}>
          <div className={cx(styles.box)}>
            <CompetitorProfile userId={roomInfo.players[0]} />
          </div>
          <div className={styles.versus}>VS</div>
          <div className={cx(styles.box)}>
            {roomInfo.players[1] && (
              <CompetitorProfile userId={roomInfo.players[1]} />
            )}
          </div>
        </div>
        <section className={cx(styles.container, styles.bottom)}>
          <div className={cx(styles.chatbox, styles.left)}>
            <Chat roomId={roomInfo.chatroom_id} />
          </div>
          <div className={cx(styles.right, styles.chatbox)}>
            <div className={cx(styles.buttons, styles.container)}>
              <button
                className={cx(
                  styles.readyButton,
                  `${disabled.readyButton && styles.disabled}`
                )}
                disabled={disabled.readyButton}
                onClick={onClickReady}
              >
                준비
              </button>
              <button
                className={cx(
                  styles.startButton,
                  `${disabled.startButton && styles.disabled}`
                )}
                disabled={disabled.startButton}
                onClick={onClickStart}
              >
                게임 시작
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Wait;
