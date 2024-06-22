import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.scss";
import { useMe } from "../../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainPage: React.FC = () => {
  const { me } = useMe();
  useEffect(() => {
    console.log(me);
    toast.info(`Welcome, ${me.name}!`);
  }, [me]);

  const navigate = useNavigate();

  return (
    <form className="main-layout">
      <div className="left-column">
        <div className="box list"></div>
      </div>

      <div className="right-column">
        <div className="box chat"></div>
        <div className="box create">{/* 아마도 버튼으로 해야 함 */}</div>
      </div>
    </form>
  );
};

export default MainPage;
