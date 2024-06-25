import React, { useEffect, useState } from "react";
import { Modal } from "../../../../components/Common/";
import { useNavigate } from "react-router-dom";
import "./defeat.css"; // 좌절감을 표현하는 CSS 파일

interface DefeatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DefeatModal: React.FC<DefeatModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000); // 1초 후에 흔들림 멈춤
    }
  }, [isOpen]);

  const handleExitClick = () => {
    onClose();
    navigate("/");
  };

  return (
    <div onClick={handleExitClick}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='large'
        closeButton={false}
        classNames='modal-background text-white'
      >
        <div className='text-center relative'>
          <h2
            className={`text-7xl font-bold mb-10 ${shake ? "defeat-text" : ""}`}
          >
            Game
            <br />
            Over
          </h2>
          <div className='flex justify-center'>
            <button
              className='bg-secondary text-white px-6 py-2 rounded font-semibold'
              onClick={handleExitClick}
            >
              나가기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DefeatModal;
