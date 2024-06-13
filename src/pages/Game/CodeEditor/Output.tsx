import React, { useState } from "react";
import { executeCode } from "../temporary_api";
import { Button } from "../../../components/Common";
import "../../styles/tailwind.scss";
interface OutputProps {
  editorRef: React.RefObject<any>;
  language: string;
}
const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      if (!!result.stderr) {
        throw new Error(result.stderr);
      }
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(true);
        console.log(error.message);
        alert(error.message || "Unable to run code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white text-black rounded shadow-md w-[50%] h-[50vh] border">
      <p className="mb-2 text-lg font-semibold ">Output</p>

      <Button
        type="button"
        size={"medium_small_radius"}
        onClick={runCode}
        color="secondary"
        textColor="primary_font"
        name={"Run Code"}
        isLoading={isLoading}
      ></Button>

      <div
        className={`h-[75vh] p-2 border mt-4${
          isError
            ? "border-red-500 text-red-400 line-through"
            : "border-gray-800"
        } rounded`}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
