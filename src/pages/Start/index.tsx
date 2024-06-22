import React, { useEffect, useState } from "react";
import styles from "./start.module.scss";
import { useNavigate } from "react-router-dom";

const Start: React.FC = () => {
  const navigate = useNavigate();
  const [h1Loaded, setH1Loaded] = useState(false);
  const [h2Loaded, setH2Loaded] = useState(false);

  useEffect(() => {
    const h1Timer = setTimeout(() => {
      setH1Loaded(true);
    }, 500);

    return () => clearTimeout(h1Timer);
  }, []);

  useEffect(() => {
    const h2Timer = setTimeout(() => {
      setH2Loaded(true);
    }, 1200);

    return () => clearTimeout(h2Timer);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section
          id="main-title"
          className={`${styles.section} ${h1Loaded ? styles.loaded : ""}`}
        >
          <div className={styles.content}>
            <h1>알고리즘을 더 쉽고 재미있게</h1>
            <h2>알고리즘 파이터에서</h2>
          </div>
        </section>
        <section
          id="main-button"
          className={`${styles.section} ${h2Loaded ? styles.loaded : ""}`}
        >
          <div className={styles.content}>
            <div className={styles["button-container"]}>
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                지금 바로 시작해 보세요
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Start;
