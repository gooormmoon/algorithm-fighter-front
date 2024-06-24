import React, { useEffect, useState } from "react";

interface TimerProps {
  timer_time: number;
}
const Timer: React.FC<TimerProps> = ({ timer_time }) => {
  // 시간을 담을 변수
  const initialTime = Number(timer_time);
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(id);
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <div className='text-lg font-bold'>
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};
export default Timer;
