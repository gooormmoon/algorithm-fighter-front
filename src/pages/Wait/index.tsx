import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./wait.module.scss";
import CompetitorProfile from "./CompetitorProfile";
import Chat from "../../components/Chat";
import { Dropdown, RadioButton } from "../../components/Common";
import { useTheme } from "../../store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const numberOptions = [10, 20, 30, 40, 50, 60];

const Wait: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(10);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

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
            <button className="font-bold text-[20px]" onClick={handleClick}>
              <ArrowBackIcon />
            </button>
            <h1 className={styles.title}>게임 방 제목</h1>
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
            <CompetitorProfile />
          </div>
          <div className={styles.versus}>VS</div>
          <div className={cx(styles.box)}>
            <CompetitorProfile />
          </div>
        </div>
        <section className={styles.container}>
          <div className={cx(styles.chatbox, styles.left)}>
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
