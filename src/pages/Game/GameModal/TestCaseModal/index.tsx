import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal, Button, Input } from "../../../../components/Common/";
import CloseIcon from "@mui/icons-material/Close";

interface TestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TestCase {
  id: string;
  value: string;
  result: string;
}

const TestCaseModal: React.FC<TestCaseModalProps> = ({
  isOpen,
  onClose,
  setModalOpen,
}) => {
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: uuidv4(), value: "", result: "" },
  ]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("test-case") as string) || [
      { id: uuidv4(), value: "", result: "" },
    ];
    setTestCases(data);

    return () => {};
  }, []);

  const handleInputChange = (
    id: string,
    type: "value" | "result",
    newValue: string
  ) => {
    const newTestCases = testCases.map((testCase) => {
      if (testCase.id === id) {
        return { ...testCase, [type]: newValue };
      }
      return testCase;
    });

    setTestCases(newTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { id: uuidv4(), value: "", result: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("test-case", JSON.stringify(testCases));
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const newTestCases = testCases.filter((testCase) => testCase.id !== id);
    setTestCases(newTestCases);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <div className="pb-5 text-2xl font-bold text-secondary ">
        테스트 케이스 추가하기
      </div>
      <div className="pt-3 overflow-auto">
        <form onSubmit={handleSubmit}>
          {testCases.map((testCase, index) => (
            <div key={testCase.id} className="py-3 border-b-2">
              <div className="flex ">
                <div>Parameter {index + 1}</div>
                <div className="ml-[250px]">Result {index + 1}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  border={true}
                  type="text"
                  name="value input"
                  placeholder="value Input"
                  value={testCase.value}
                  onChange={(e) =>
                    handleInputChange(testCase.id, "value", e.target.value)
                  }
                  size="small"
                />

                <Input
                  border={true}
                  name="result input"
                  type="text"
                  placeholder="Result Input"
                  value={testCase.result}
                  onChange={(e) =>
                    handleInputChange(testCase.id, "result", e.target.value)
                  }
                  size="small"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(testCase.id)}
                  // className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 flex flex-col justify-center items-center text-center dark:hover:bg-gray-600 dark:hover:text-white"
                  className="ml-2 px-2 py-1  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 flex flex-col justify-center items-center text-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end items-end space-x-4 p-3">
            <Button
              type="button"
              size="medium_big_radius"
              color="secondary"
              textColor="primary_font"
              name="추가"
              onClick={addTestCase}
            />
            <Button
              size="medium_big_radius"
              color="secondary"
              textColor="primary_font"
              name="저장"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TestCaseModal;
