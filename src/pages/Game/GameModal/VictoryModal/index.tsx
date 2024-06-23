import React, { useEffect } from "react";
import { Modal } from "../../../../components/Common/";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VictoryModal: React.FC<VictoryModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      // 함수 표현식 사용
      const randomInRange = function (min: number, max: number) {
        return Math.random() * (max - min) + min;
      };

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: {
              x: randomInRange(0.1, 0.3),
              y: Math.random() - 0.2,
            },
            colors: [
              "#26ccff",
              "#a25afd",
              "#ff5e7e",
              "#88ff5a",
              "#fcff42",
              "#ffa62d",
              "#ff36ff",
            ],
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: {
              x: randomInRange(0.7, 0.9),
              y: Math.random() - 0.2,
            },
            colors: [
              "#26ccff",
              "#a25afd",
              "#ff5e7e",
              "#88ff5a",
              "#fcff42",
              "#ffa62d",
              "#ff36ff",
            ],
          })
        );
      }, 250);
    }
  }, [isOpen]);
  const navigate = useNavigate();
  const handleExitClick = () => {
    onClose();
    navigate("/");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='large'
        closeButton={false}
        classNames='bg-transparent text-white'
      >
        <div className='text-center'>
          <h2 className='text-7xl font-bold mb-10'>You Win!</h2>
          <div className='flex justify-center'>
            <button
              className='bg-secondary text-white px-6 py-2 rounded font-semibold'
              onClick={handleExitClick}
            >
              나가기
            </button>
          </div>
        </div>
        <div id='confetti-container'></div>
      </Modal>
    </>
  );
};

export default VictoryModal;
