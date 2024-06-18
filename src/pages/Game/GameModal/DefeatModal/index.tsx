import React from 'react'
import { Modal } from "../../../../components/Common/";

interface DefeatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DefeatModal: React.FC<DefeatModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large" closeButton={false}>
      <div className="text-center" >
        <h2 className="text-7xl font-bold mb-10 sparkle-container text-white">Game<br/>Over</h2>
        <div className='item-center'>
        <button
          className="bg-secondary text-white px-6 py-2 rounded font-semibold mr-4"
          onClick={onClose}
          >
          나가기
        </button>
        <button className="bg-primary text-black font-semibold px-4 py-2 rounded mr-4">
          저장하기
        </button>
          </div>
      </div>
    </Modal>
  );
};

export default DefeatModal;