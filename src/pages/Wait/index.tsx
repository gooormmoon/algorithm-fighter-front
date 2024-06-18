import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Wait.scss';

const Wait: React.FC = () => {
  const navigate = useNavigate();

  return (  
    <main className="wait-layout">
      <h1 className="title">게임 대기 화면</h1>
      <div className="top-row">
        <div className="box top-left"></div>
        <div className="center-text">VS</div>
        <div className="box top-right"></div>
      </div>
      <div className="bottom-row">
        <div className="box bottom-left"></div>
        <div className="bottom-right-column">
          <div className="box bottom-right"></div>
          <div className="box bottom-right"></div>
          <div className="box bottom-right"></div>
        </div>
      </div>
    </main>
  );
};

export default Wait;
