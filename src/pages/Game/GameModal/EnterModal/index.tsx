import React from "react";
import {
  Modal,
  Button,
  Input,
  Dropdown,
  RadioButton,
} from "../../../../components/Common/";

interface EnterModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteCode: string;
  selectedDifficulty: string;
  selectedNumber: string;
}

const EnterModal: React.FC<EnterModalProps> = ({
  isOpen,
  onClose,
  inviteCode,
  selectedDifficulty,
  selectedNumber,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex-col mt-6 text-lg text-[#213363] font-semibold mb-2">
        <span className="block text-lg text-[#213363] font-semibold mb-2">
          초대코드
        </span>
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="000000"
            value={inviteCode}
            name="inviteCode"
            size="small"
          />
          <Button
            type="button"
            size="medium_small_radius"
            color="secondary"
            textColor="secondary_font"
            name="입력"
          />
        </div>
      </div>

      <div className="mb-6">
        <span className="block text-lg text-[#213363] font-semibold mb-2">
          난이도
        </span>
        <RadioButton
          selectedValue={selectedDifficulty}
          onChange={() => {}}
          readOnly
        />
      </div>

      <div className="mb-6">
        <span className="block text-lg text-[#213363] font-semibold mb-2">
          타이머
        </span>
        <div className="flex items-center text-2xl">{selectedNumber}</div>
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          size="large_radius"
          color="primary"
          textColor="primary_font"
          name="대기"
        />
      </div>
    </Modal>
  );
};

export default EnterModal;
