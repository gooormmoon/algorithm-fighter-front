import React, { useEffect, useState } from "react";

const MyRepository = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [width, setWidth] = useState(window.innerWidth / 2);
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialX(e.clientX);
  };
  const onMouseUp = () => {
    setIsResizing(false);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = width + e.clientX - initialX;
      setInitialX(e.clientX);
      if (newWidth >= 360 && newWidth <= 1800) {
        setWidth(newWidth);
      }
    }
  };
  useEffect(() => {
    if (isResizing) {
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
  }, [isResizing]);
  return (
    <main className="w-full h-full flex">
      <div className="h-full " style={{ width }}>
        <section></section>
      </div>
      <div
        className="flex justify-center items-center w-[28px] bg-blue-300 cursor-col-resize hover:bg-blue-500"
        onMouseDown={onMouseDown}
      >
        ||
      </div>
      <div className="w-[2000px] h-full flex flex-col">
        <section className="w-full h-3/4 bg-yellow-300"></section>
        <section className="w-full h-1/4 bg-green-300"></section>
      </div>
    </main>
  );
};

export default MyRepository;
