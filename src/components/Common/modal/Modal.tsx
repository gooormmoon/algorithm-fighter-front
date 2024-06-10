import { useState } from 'react';

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={openModalHandler}
        className=" py-3 px-6 rounded-lg cursor-pointer"
      >
        {isOpen ? 'Opened!' : 'event'}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={openModalHandler}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={openModalHandler}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex-justify-end dark:hover:bg-gray-600 dark:hover:text-white"
            >
              x
            </button>
            <div className="mt-6 text-lg text-[#213363]">
              Goormdal
            </div>
          </div>
        </div>
      )}
    </div>
  );
};