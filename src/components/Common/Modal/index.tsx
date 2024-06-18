import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "small" | "medium" | "large";
  bgColor?: string;
  closeButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  size = "medium",
  bgColor = 'bg-white',
  closeButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "max-w-sm";
      case "medium":
        return "max-w-xl";
      case "large":
        return "max-w-3xl";
      default:
        return "max-w-xl";
    }
  };

  const bgColorClass = (color: string) => {
    return `bg-${color}`
  }

  return (
    <div className="flex absolute ">
      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-scroll"
          onClick={onClose}
        >
          <div
            className={`relative p-4 w-full ${getSizeClasses()} max-h-full transition-all duration-150`}
          >
            <div
              className={`${bgColorClass(bgColor)} p-6 rounded-lg w-full relative`}
              onClick={(e) => e.stopPropagation()}
            >
              {closeButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl w-8 h-8 flex flex-col justify-center items-center text-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <CloseIcon />
                </button>
              )}

              <div className="mt-6 text-lg text-[#213363] font-semibold"></div>
              <div className="mt-4">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
