import React, { useEffect, useState } from "react";
import Chat from "../../components/Common/Chat";
const MyRepository = () => {
  const [isResizingX, setIsResizingX] = useState(false);
  const [isResizingY, setIsResizingY] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [width, setWidth] = useState(window.innerWidth / 3);
  const [height, setHeight] = useState(window.innerHeight / 1.5);

  const onMouseDownX = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingX(true);
    setInitialX(e.clientX);
  };

  const onMouseDownY = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingY(true);
    setInitialY(e.clientY);
  };

  const onMouseUp = () => {
    setIsResizingX(false);
    setIsResizingY(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isResizingX) {
      const newWidth = width + e.clientX - initialX;
      setInitialX(e.clientX);
      if (newWidth >= 360 && newWidth <= 1600) {
        setWidth(newWidth);
      }
    }
    if (isResizingY) {
      const newHeight = height + e.clientY - initialY;
      setInitialY(e.clientY);
      if (newHeight >= 120 && newHeight <= 2600) {
        setHeight(newHeight);
      }
    }
  };

  useEffect(() => {
    if (isResizingX || isResizingY) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizingX, isResizingY]);

  return (
    <main className="w-full h-full flex overflow-hidden">
      <div className="h-full" style={{ width }}>
        <section></section>
      </div>
      <div
        className="flex justify-center items-center w-[20px] bg-blue-300 cursor-col-resize hover:bg-blue-500"
        onMouseDown={onMouseDownX}
      >
        ||
      </div>
      <div className="flex-1 h-full flex flex-col overflow-hidden">
        <section className="w-full bg-yellow-300" style={{ height }}>
          <Chat />
        </section>
        <div
          className="flex flex-col justify-center items-center w-full h-[24px]text-center bg-blue-300 cursor-row-resize hover:bg-blue-500"
          onMouseDown={onMouseDownY}
        >
          ||
        </div>
        <section className="w-full flex-1 bg-green-300"></section>
      </div>
    </main>
  );
};

export default MyRepository;
