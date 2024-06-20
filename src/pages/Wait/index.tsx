import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./wait.module.scss";
import CompetitorProfile from "./CompetitorProfile";
import Chat from "../../components/Chat";
import { Dropdown, RadioButton } from "../../components/Common";

const numberOptions = [10, 20, 30, 40, 50, 60];

const Wait: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(10);

  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <main className={styles.layout}>
      <section className={styles.waitContainer}>
        <div className={styles.waitHeader}>
          <div className={styles.buttons}>
            <button
              className="font-bold text-[20px] text-white"
              onClick={handleClick}
            >
              뒤로가기
            </button>
          </div>
          <h1 className={styles.title}>게임 방 제목</h1>
          <div className={styles.controls}>
            <div className={styles.radioWrapper}>
              <RadioButton
                selectedValue={selectedDifficulty}
                onChange={(value) => setSelectedDifficulty(value)}
              />
            </div>
            <Dropdown
              color={"text-secondary bg-white rounded flex font-bold"}
              options={numberOptions}
              selectedValue={selectedNumber}
              onChange={(value) => setSelectedNumber(value)}
              showMinutes={true}
            />
          </div>
        </div>
        <div className={cx(styles.container, styles.top)}>
          <div className={styles.box}>
            <CompetitorProfile />
          </div>
          <div className={styles.versus}>VS</div>
          <div className={styles.box}>
            <CompetitorProfile />
          </div>
        </div>
        <section className={styles.container}>
          <div className={cx(styles.chatbox, styles.right)}>
            <Chat />
          </div>
          <div className={cx(styles.right, styles.chatbox)}>
            <div className={cx(styles.buttons, styles.container)}>
              <button className={styles.readyButton}>준비</button>
              <button className={styles.startButton}>게임 시작</button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Wait;
