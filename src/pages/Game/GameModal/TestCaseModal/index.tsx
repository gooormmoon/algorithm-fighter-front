import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal, Button, Input } from "../../../../components/Common/";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

interface TestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  testCases: { id: string; value: string; result: string }[];
  handleInputChange: (
    id: string,
    type: "value" | "result",
    newValue: string
  ) => void;
  handleDelete: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  addTestCase: () => void;
}

const TestCaseModal: React.FC<TestCaseModalProps> = ({
  isOpen,
  onClose,
  testCases,
  handleInputChange,
  handleDelete,
  handleSubmit,
  addTestCase,
}) => {
  const handleAddTestCase = () => {
    addTestCase();
  };

  const handleDeleteTestCase = (id: string) => {
    handleDelete(id);
  };

  const handleSaveTestCases = (e: React.FormEvent) => {
    handleSubmit(e);
    // toast.success("테스트 케이스가 저장되었습니다.");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='large'>
      <div className='flex'>
        <div className='pb-5 text-2xl font-bold text-secondary'>
          테스트 케이스 추가하기
        </div>
        <div className='pb-5 px-4 text-2xl text-gray-500 bg-gray-200 '>
          result 하나 이상
        </div>
      </div>
      <div className='pt-3 overflow-auto'>
        <form onSubmit={handleSaveTestCases}>
          {testCases.map((testCase, index) => (
            <div key={testCase.id} className='py-3 border-b-2'>
              <div className='flex '>
                <div>Parameter {index + 1}</div>
                <div className='ml-[180px]'>Result {index + 1}</div>
              </div>
              <div className='flex items-center space-x-2'>
                <Input
                  border={true}
                  type='text'
                  name='value input'
                  placeholder='value Input'
                  value={testCase.value}
                  onChange={(e) =>
                    handleInputChange(testCase.id, "value", e.target.value)
                  }
                  size='small'
                />

                <Input
                  border={true}
                  name='result input'
                  type='text'
                  placeholder='Result Input'
                  value={testCase.result}
                  onChange={(e) =>
                    handleInputChange(testCase.id, "result", e.target.value)
                  }
                  size='small'
                />
                <button
                  type='button'
                  onClick={() => handleDeleteTestCase(testCase.id)}
                  // className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 flex flex-col justify-center items-center text-center dark:hover:bg-gray-600 dark:hover:text-white"
                  className='ml-2 px-2 py-1  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 flex flex-col justify-center items-center text-center dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          ))}
          <div className='flex justify-end items-end space-x-4 p-3'>
            <Button
              type='button'
              size='medium_big_radius'
              color='secondary'
              textColor='primary_font'
              name='추가'
              onClick={handleAddTestCase}
            />
            <Button
              size='medium_big_radius'
              color='secondary'
              textColor='primary_font'
              name='저장'
              type='submit'
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TestCaseModal;
