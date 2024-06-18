import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.scss";
import Chat from "../../components/Chat";

const Main: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="main-layout">
      <div className="left-column">
        <div className="box list"></div>
      </div>

      <div className="right-column">
        <div className="box chat">
          <Chat />
        </div>
        <div className="box create">{/* 아마도 버튼으로 해야 함 */}</div>
      </div>
    </main>
  );
};

export default Main;
