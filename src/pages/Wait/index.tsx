import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./wait.module.scss";
import CompetitorProfile from "./CompetitorProfile";
import Chat from "../../components/Chat";
import { Dropdown, RadioButton } from "../../components/Common";

const numberOptions = [10, 20, 30, 40, 50, 60].map((opt) => opt + " minute");

const Wait: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("lv0");
  const [selectedNumber, setSelectedNumber] = useState("10 minute");

  const navigate = useNavigate();

  return (
    <main className={styles.layout}>
      <section className={styles.waitContainer}>
        <div className={styles.waitHeader}>
          <Link to="/" className="w-1/5">
            뒤로가기
          </Link>
          <h1 className={styles.title}>게임 방 제목</h1>
          <div className="w-1/5 flex justify-center items-center gap-4">
            <div className="w-2/3 h-full ">
              <RadioButton
                selectedValue={selectedDifficulty}
                onChange={(value) => setSelectedDifficulty(value)}
              />
            </div>
            <Dropdown
              color={"text-secondary bg-white rounded flex "}
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
        <div className={styles.container}>
          <div className={styles.box}>
            <Chat />
          </div>

          <div className={cx(styles.box, styles.right)}>
            <div className="w-full h-full flex justify-between gap-12">
              <button className="w-1/2 h-full bg-primary text-[36px] text-white font-semibold rounded-2xl shadow-lg drop-shadow-lg hover:-translate-y-2 transition-all ease-in-out">
                준비
              </button>
              <button className="w-1/2 h-full bg-tertiary text-[36px] text-white font-semibold  rounded-2xl shadow-lg drop-shadow-lg hover:-translate-y-2 transition-all ease-in-out">
                게임 시작
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Wait;
