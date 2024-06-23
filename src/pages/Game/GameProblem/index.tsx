import React, { memo } from "react";

type GameProblemProps = {
  problemTitle: string;
  problemData: string;
};
const GameProblem: React.FC<GameProblemProps> = ({
  problemTitle,
  problemData,
}) => {
  return (
    <div className="p-6 pt-[50px] max-h-[100%] overflow-auto">
      <h1>{problemTitle}</h1>
      <h2 className="text-xl font-semibold mb-4">문제 설명</h2>
      <p>{problemData}</p>
    </div>
  );
};

export default memo(GameProblem);
