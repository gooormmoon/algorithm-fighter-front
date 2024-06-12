import React from "react";
import styles from "./button.module.scss";
import cx from "classnames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size: string;
  color: string;
  textColor: string;
  name: string;
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
}) => {
  return (
    <button
      type={type}
      className={cx(
        styles[color],
        styles[size],
        styles[textColor],
        "cursor-pointer"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
