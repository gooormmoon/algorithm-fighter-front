import React from "react";
import { Modal } from "../../../components/Common";
interface MembershipWithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MembershipWithdrawalModal: React.FC<MembershipWithdrawalModalProps> = ({
  isOpen,
  onClose,
}) => {
  // const { theme } = useTheme();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <div className="text-center text-secondary">
        <h2 className="text-xl font-bold mb-4">회원탈퇴</h2>
        <p className="mb-4">정말로 회원탈퇴를 하시겠습니까?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            취소
          </button>
          <button
            onClick={() => {
              //
              onClose();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MembershipWithdrawalModal;
