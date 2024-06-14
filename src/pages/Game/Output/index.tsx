import "../../../styles/tailwind.scss";
interface OutputProps {
  isError: boolean;
  output: string[] | null;
}
const Output: React.FC<OutputProps> = ({ isError, output }) => {
  return (
    <div className="p-4  text-black rounded shadow-md w-[100%] h-full border flex flex-col">
      <p className="mb-2 text-lg font-semibold ">Output</p>

      <div
        className={` p-2 border mt-4 w-full flex-1 overflow-auto${
          isError
            ? "border-red-500 text-red-400 line-through"
            : "border-gray-800"
        } rounded`}
      >
        {output
          ? output.map((line: string, i: number) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
