import React, { memo } from "react";
import { useTheme } from "../../../store/store";

const GameProblem = () => {
  const { theme } = useTheme();
  return (
    <div className={`p-6 pt-[50px] max-h-[100%] overflow-auto `}>
      <h2 className="text-xl font-semibold mb-4">문제 설명</h2>
      {/* This is a Sample Problem text */}
      <>
        <p className="mb-4">
          수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에
          수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지
          다음과 같이 찍습니다.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...</li>
          <li>
            2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2,
            5, ...
          </li>
          <li>
            3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2,
            2, 4, 4, 5, 5, ...
          </li>
        </ul>
        <p className="mb-4">
          1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가
          주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return
          하도록 solution 함수를 작성해주세요.
        </p>
        <h3 className="text-lg font-semibold mb-2">제한 조건</h3>
        <ul className="list-disc list-inside mb-4">
          <li>시험은 최대 10,000 문제로 구성되어있습니다.</li>
          <li>문제의 정답은 1, 2, 3, 4, 5 중 하나입니다.</li>
          <li>
            가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순
            정렬해주세요.
          </li>
        </ul>
        <h3 className="text-lg font-semibold mb-2">입출력 예</h3>
        <table className="table-auto w-full mb-4 border">
          <thead>
            <tr className="bg-gray-400">
              <th className="border px-4 py-2">answers</th>
              <th className="border px-4 py-2">return</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">[1,2,3,4,5]</td>
              <td className="border px-4 py-2">[1]</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">[1,3,2,4,2]</td>
              <td className="border px-4 py-2">[1,2,3]</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold mb-2">입출력 예 설명</h3>
        <p className="mb-2">
          <strong>입출력 예 #1</strong>: 수포자 1은 모든 문제를 맞혔습니다.
          수포자 2는 모든 문제를 틀렸습니다. 수포자 3은 모든 문제를 틀렸습니다.
          따라서 가장 문제를 많이 맞힌 사람은 수포자 1입니다.
        </p>
        <p>
          <strong>입출력 예 #2</strong>: 모든 사람이 2문제씩을 맞췄습니다.
        </p>
      </>
    </div>
  );
};

export default memo(GameProblem);
