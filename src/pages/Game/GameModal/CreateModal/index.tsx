// CreateModal.tsx
import React, { useState } from "react";
import useInputChange from "../../../../hooks/useInputChange";
import {
  Dropdown,
  Modal,
  RadioButton,
  Button,
  Input,
} from "../../../../components/Common/";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const numberOptions = [10, 20, 30, 40, 50, 60].map((opt) => opt + " minute");
const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | string>(
    numberOptions[0]
  );

  const example = {
    code: "",
  };

  const [randomCode, handleRandomCode] = useInputChange(example.code);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <RadioButton />
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
      <div className="mt-3 flex">
        <Button
          type="submit"
          size="medium_small_radius"
          color="primary"
          textColor="primary_font"
          name="코드 생성"
        />
      </div>
      <div className="flex-col mt-6 text-lg text-[#213363] font-semibold mb-2">
        초대코드
        {/* <div className="grid w-full grid-cols-5 gap-2 rounded-xl bg-white p-2"> */}
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
        {/* <div className="mt-1 flex">
          <Button
            type="submit"
            size="medium_small_radius"
            color="secondary"
            textColor="secondary_font"
            name="복사"
          />
        </div> */}
        <div className="mt-9 flex justify-center">
          {/* <Button
            type="submit"
            size="large_radius"
            color="secondary"
            textColor="secondary_font"
            name="게임 시작!"
          /> */}
          <Button
            type="submit"
            size="medium_big_radius"
            color="primary"
            textColor="secondary_font"
            name="게임 시작!"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
