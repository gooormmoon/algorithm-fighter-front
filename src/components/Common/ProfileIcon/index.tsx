import React from "react";
import defaultImage from "./jinjuseo.jpeg";
type IconSize = "small" | "medium" | "large";
const iconSize: Record<IconSize, string> = {
  small: "h-[24px] w-[24px]",
  medium: "h-[32px] w-[32px]",
  large: "h-[112px] w-[112px]",
};

const ProfileIcon = ({ src, size }: { src?: string; size: IconSize }) => {
  return (
    <div
      className={`${iconSize[size]}
         relative drop-shadow-2xl overflow-hidden rounded-[70%]`}
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
