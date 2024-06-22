import "../../../styles/tailwind.scss";
interface OutputProps {
  isError: boolean;
  output: string[] | null;
  outcomeMessage: string;
}
const Output: React.FC<OutputProps> = ({ isError, output, outcomeMessage }) => {
  return (
    <div className="p-4 rounded-lg w-[100%] h-full flex flex-col ">
      <p className="mb-2 text-lg font-semibold ">Output</p>

      <div
        className={` p-2 mt-4 w-full flex-1 overflow-auto  shadow-sm rounded-lg ${
          isError
            ? "border-red-500 text-red-400 line-through"
            : "border-white/10"
        } rounded`}
      >
        {output
          ? output.map((line: string, i: number) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
        {outcomeMessage}
      </div>
    </div>
  );
};

export default Output;
