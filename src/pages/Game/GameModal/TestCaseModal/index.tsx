import React, { useState } from "react";
import useInputChange from "../../../../hooks/useInputChange";
import { Modal, Button, Input } from "../../../../components/Common/";

interface TestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  //  onSubmit: (testCases: { value: string; result: string }[]) => void;
}
const TestCaseModal: React.FC<TestCaseModalProps> = ({
  isOpen,
  onClose,
  //onSubmit,
}) => {
  const [testCases, setTestCases] = useState([{ value: "", result: "" }]);

  const handleInputChange = (
    index: number,
    type: "value" | "result",
    newValue: string
  ) => {
    const newTestCases = [...testCases];
    newTestCases[index][type] = newValue;
    setTestCases(newTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { value: "", result: "" }]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-2xl font-bold">테스트 케이스 추가</div>
      <div className="modal-body">
        <form id="applicant-testcase-form">
          {testCases.map((testCase, index) => (
            <div key={index} className="applicant-testcase">
              <div className="panel panel-default input">
                <div className="panel-heading">
                  <div>Parameters {index + 1}</div>
                </div>
                <div className="panel-body">
                  <Input
                    type="text"
                    name="value input"
                    placeholder="value Input"
                    value={testCase.value}
                    onChange={(e) =>
                      handleInputChange(index, "value", e.target.value)
                    }
                    size="large"
                  />
                  <Input
                    name="result input"
                    type="text"
                    placeholder="Result Input"
                    value={testCase.result}
                    onChange={(e) =>
                      handleInputChange(index, "result", e.target.value)
                    }
                    size="large"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="panel panel-default input">
            <Button
              size="medium_big_radius"
              color="secondary"
              textColor="primary_font"
              name="테스트 케이스 추가"
              onClick={addTestCase}
            />
          </div>
          <Button
            size="medium_big_radius"
            color="secondary"
            textColor="primary_font"
            name="제출"
            type="submit"
          />
        </form>
      </div>
    </Modal>
  );
};

export default TestCaseModal;
