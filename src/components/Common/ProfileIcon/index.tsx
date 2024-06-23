import React from "react";
import defaultImage from "./defaultUser.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
type IconSize = "small" | "medium" | "large" | "x_large";
const iconSize: Record<IconSize, string> = {
  small: "h-[24px] w-[24px]",
  medium: "h-[32px] w-[32px]",
  large: "h-[112px] w-[112px]",
  x_large: "h-[200px] w-[200px]",
};

const ProfileIcon = ({
  src,
  size,
  className,
}: {
  src?: string;
  size: IconSize;
  className?: string;
}) => {
  return (
    <div
      className={`${iconSize[size]} ${className}
         relative overflow-hidden rounded-[70%] shadow-md drop-shadow-2xl`}
    >
      <img
        alt="user profileImage"
        src={src || defaultImage}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ProfileIcon;
