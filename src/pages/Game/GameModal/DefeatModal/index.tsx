import React from "react";
import { Modal } from "../../../../components/Common/";
import { toast } from "react-toastify";

interface DefeatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DefeatModal: React.FC<DefeatModalProps> = ({ isOpen, onClose }) => {
  const handleExitClick = () => {
    toast.info("게임을 종료합니다.");
    onClose();
  };
  const handleContinueClick = () => {
    toast.success("새 게임을  시작합니다.");
    // 게임을 다시 시작하는 로직 추가
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      closeButton={false}
      classNames="bg-transparent text-white"
    >
      <div className="text-center">
        <h2 className="text-7xl font-bold mb-10 sparkle-container ">
          Game
          <br />
          Over
        </h2>
        <div className="item-center">
          <button
            className="bg-secondary text-white px-6 py-2 rounded font-semibold mr-4"
            onClick={handleExitClick}
          >
            나가기
          </button>
          <button
            className="bg-primary text-black font-semibold px-4 py-2 rounded mr-4"
            onClick={handleContinueClick}
          >
            계속하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DefeatModal;
