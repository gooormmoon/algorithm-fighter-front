import React from "react";
import defaultImage from "./jinjuseo.jpeg";
const ProfileIcon = ({ src, size }: { src?: string; size: string }) => {
  const iconSize =
    size === "large" ? "h-[112px] w-[112px]" : "h-[24px] w-[24px]";
  return (
    <div
      className={
        iconSize + " relative drop-shadow-2xl overflow-hidden rounded-[70%]"
      }
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
