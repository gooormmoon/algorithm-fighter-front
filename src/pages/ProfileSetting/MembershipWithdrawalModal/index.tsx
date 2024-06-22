import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/Common";
import { deleteUser } from "../../../api/Users";
import { useMe } from "../../../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { reset } = useMe();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleWithdraw = async () => {
    try {
      await deleteUser({ id: userId, password: password });
      localStorage.removeItem("meStorage");
      toast.success("회원탈퇴가 성공적으로 완료되었습니다");
      reset();
      localStorage.clear();
      navigate("/login");
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(`회원탈퇴 실패: 관리자에게 문의하세요`);
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
