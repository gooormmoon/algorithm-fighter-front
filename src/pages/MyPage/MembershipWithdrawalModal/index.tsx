import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/Common";
import { withdrawal } from "../../../api/Auth"; // API 함수 import

interface MembershipWithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const MembershipWithdrawalModal: React.FC<MembershipWithdrawalModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleWithdraw = async () => {
    try {
      await withdrawal({ id: userId, password: password });
      alert("회원탈퇴가 성공적으로 완료되었습니다");
      navigate("/");
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <div className="text-center text-secondary">
        <h2 className="text-xl font-bold mb-4">회원탈퇴</h2>
        <p className="mb-4">정말로 회원탈퇴를 하시겠습니까?</p>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            취소
          </button>
          <button
            onClick={handleWithdraw}
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
