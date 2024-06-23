import React from "react";
import { Modal } from "../../../../components/Common/";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DefeatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DefeatModal: React.FC<DefeatModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleExitClick = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='large'
      closeButton={false}
      classNames='bg-transparent text-white'
    >
      <div className='text-center'>
        <h2 className='text-7xl font-bold mb-10 sparkle-container '>
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
  );
};

export default DefeatModal;
