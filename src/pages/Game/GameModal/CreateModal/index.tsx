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
  onSubmit: (code: string, difficulty: string, timer: string) => void;
}
const numberOptions = [10, 20, 30, 40, 50, 60].map((opt) => opt + " minute");

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | string>(
    numberOptions[0]
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("lv0");

  const [randomCode, handleRandomCode] = useInputChange("");

  const handleSubmit = () => {
    onSubmit(randomCode, selectedDifficulty, selectedNumber.toString());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <span className="mr-12 text-lg text-[#213363] font-semibold mt-6 flex item-center">
        난이도 설정
      </span>
      <RadioButton selectedValue={selectedDifficulty} onChange={(value) => setSelectedDifficulty(value)}/>
        <div className="mt-6 flex item-center">
          <span className="mr-12 text-lg text-[#213363] font-semibold">
            타이머 설정
          </span>
          <Dropdown
            options={numberOptions}
            selectedValue={selectedNumber}
            onChange={(value) => setSelectedNumber(value)}
            showMinutes={true}
          />
        </div>
        <div className="mt-6 flex item-center">
          <span className="mr-12 text-lg text-[#213363] font-semibold">
          </span>
        
        </div>
        <div className="mt-3 flex">
          <Button
            type="submit"
            size="medium_small_radius"
            color="primary"
            textColor="primary_font"
            name="코드 생성"
            onClick={handleSubmit}
          />
        </div>
        <div className="flex-col mt-6 text-lg text-[#213363] font-semibold mb-2">
          초대코드
          <div className="flex w-full justify-start gap-4 items-center">
            <Input
              type="text"
              placeholder="000000"
              value={randomCode}
              onChange={handleRandomCode}
              name="test"
              size="small"
            />
            <Button
              type="submit"
              size="medium_small_radius"
              color="secondary"
              textColor="secondary_font"
              name="복사"
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
        </div>

    </Modal>
  );
};

export default CreateModal;
