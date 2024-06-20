import React, { useState } from "react";
import useInputChange from "../../../../hooks/useInputChange";
import {
  RadioButton,
  Dropdown,
  Modal,
  Button,
  Input,
} from "../../../../components/Common/";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, difficulty: number, timer: number) => void;
}
// const numberOptions = [10, 20, 30, 40, 50, 60].map((opt) => opt + " minute");
const numberOptions = [10, 20, 30, 40, 50, 60];
const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(
    numberOptions[0]
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);

  const [title, handleTitle] = useInputChange("");

  const handleSubmit = () => {
    onSubmit(title, selectedDifficulty, selectedNumber);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mt-6 flex flex-col item-center">
        <span className="text-lg text-[#213363] font-semibold">방 제목</span>
        <Input
          type="text"
          value={title}
          name="title"
          onChange={handleTitle}
          placeholder="입력하세요"
          size="small"
          disabled={false}
          border={true}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <span className="text-lg text-[#213363] font-semibold mt-6 flex item-center">
          난이도 설정
        </span>
        <RadioButton
          selectedValue={selectedDifficulty}
          onChange={(value) => setSelectedDifficulty(value)}
        />
      </div>
      <div className="mt-6 flex flex-col gap-2 item-center">
        <span className="text-lg text-[#213363] font-semibold">
          타이머 설정
        </span>
        <Dropdown
          color={"text-secondary"}
          options={numberOptions}
          selectedValue={selectedNumber}
          onChange={(value) => setSelectedNumber(value)}
          showMinutes={true}
        />
      </div>

      <div className="mt-9 flex justify-center">
        <Button
          type="submit"
          size="medium_big_radius"
          color="primary"
          textColor="secondary_font"
          name="게임 시작!"
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default CreateModal;
