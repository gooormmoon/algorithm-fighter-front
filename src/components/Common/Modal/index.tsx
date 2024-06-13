import React, { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="flex">
      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <div
              className="bg-white p-6 rounded-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                x
              </button>
              <div className="mt-6 text-lg text-[#213363] font-semibold">
                난이도 설정
              </div>
              <div className="mt-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
