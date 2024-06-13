import React from "react";
import styles from "./button.module.scss";
import cx from "classnames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size: string;
  color: string;
  textColor: string;
  name: string;
  isLoading?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "submit",
  size,
  color,
  textColor,
  name,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isLoading,
}) => {
  return (
    <button
      type={type}
      className={cx(
        styles[color],
        styles[size],
        styles[textColor],
        `cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`,
        "shadow-lg",
        "drop-shadow-lg"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Running..." : name}
    </button>
  );
};

export default Button;
