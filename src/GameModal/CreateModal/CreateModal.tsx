// CreateModal.tsx
import React, { useState } from 'react';
import Dropdown from '../../components/Common/dropdown/Dropdown';
import Modal from '../../components/Common/modal/Modal';
import RadioButton from '../../components/Common/radioButton/RadioButton';
import Button from '../../components/Common/button/Button';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const numberOptions = [10, 20, 30, 40, 50, 60];
  const [selectedNumber, setSelectedNumber] = useState<number | string>(numberOptions[0]);

  return (
    <Modal buttonText="" modalTitle="난이도 설정" isOpen={isOpen} onClose={onClose}>
      <div className='mb-6'>
        <RadioButton />
      </div>
      <div className='mt-6 flex item-center'>
      <span className='mr-4 text-lg text-[#213363] font-semibold'>타이머 설정</span>
        <Dropdown
          options={numberOptions}
          selectedValue={selectedNumber}
          onChange={(value) => setSelectedNumber(value)}
          showMinutes={true}
        />
      </div>
      <div className="flex justify-center p-3 ">
          <div className="mx-3">
            <Button
              type="submit"
              size="medium_small_radius"
              color="primary"
              textColor="primary_font"
              name="코드 생성"
            />
          </div>
      </div>
    </Modal>
  );
}

export default CreateModal;
