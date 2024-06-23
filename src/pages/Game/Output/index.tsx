import "../../../styles/tailwind.scss";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface OutputProps {
  isError: boolean;
  output: string[] | null;
  outcomeMessage: string;
}
const Output: React.FC<OutputProps> = ({ isError, output, outcomeMessage }) => {
  useEffect(() => {
    if (output && output.length > 0) {
      if (isError) {
        toast.error("코드 실행 중 에러가 발생했습니다.");
      } else {
        toast.success("코드가 성공적으로 실행되었습니다.");
      }
    }
  }, [output, isError]);
  return (
    <div className="p-4 rounded-lg w-[100%] h-full flex flex-col ">
      <p className="mb-2 text-lg font-semibold ">Output</p>

      <div
        className={` p-2 mt-4 w-full flex-1 overflow-auto  shadow-sm rounded-lg  rounded`}
      >
        {output
          ? output.map((line: string, i: number) => <p key={i}>{line}</p>)
          : "코드를 실행하세요!"}
        {outcomeMessage}
      </div>
    </div>
  );
};

export default Output;
