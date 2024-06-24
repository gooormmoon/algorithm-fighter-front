import React, { ReactNode, useEffect } from "react";
import defaultImage from "./defaultUser.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import cx from "classnames";
import {
  AlienIcon,
  AngelIcon,
  AssasinIcon,
  CircusIcon,
  DefaultIcon,
  DevilIcon,
  FairyIcon,
  GhostIcon,
  KnightIcon,
  ManIcon,
  PrincessIcon,
  SantaIcon,
  QueenIcon,
  MimoIcon,
  SurecIcon,
} from "../../../assets/profileIcons";
import styles from "./profileIcon.module.scss";
import { useMe } from "../../../store/store";
// type IconSize = "small" | "medium" | "large" | "x_large";
const ProfileIcon = ({
  src,
  size,
  className,
  onClick,
  icon,
}: {
  src?: string;
  size: string;
  className?: string;
  onClick?: () => void;
  icon?: { icon: ReactNode; name: string; id: number };
}) => {
  const { me } = useMe();
  const icons = [
    { id: 1, name: "AngelIcon", icon: <AngelIcon /> },
    { id: 2, name: "AssasinIcon", icon: <AssasinIcon /> },
    { id: 3, name: "CircusIcon", icon: <CircusIcon /> },
    { id: 4, name: "DevilIcon", icon: <DevilIcon /> },
    { id: 5, name: "GhostIcon", icon: <GhostIcon /> },
    { id: 6, name: "KnightIcon", icon: <KnightIcon /> },
    { id: 7, name: "ManIcon", icon: <ManIcon /> },
    { id: 8, name: "PrincessIcon", icon: <PrincessIcon /> },
    { id: 9, name: "QueenIcon", icon: <QueenIcon /> },
    { id: 10, name: "SantaIcon", icon: <SantaIcon /> },
    { id: 11, name: "AlienIcon", icon: <AlienIcon /> },
    { id: 12, name: "FairyIcon", icon: <FairyIcon /> },
    { id: 13, name: "DefaultIcon", icon: <DefaultIcon /> },
  ];

  const getIcon = (icon: string) => {
    return icons.find((i) => i.name === icon)?.icon;
  };
  if (icon && icon.name !== "DefaultIcon") {
    // console.log(icon);
    return (
      <div
        className={`${styles[size]} ${className}
   rounded-full flex justify-center items-center  drop-shadow-2xl`}
        onClick={onClick}
      >
        {icon.icon}
      </div>
    );
  } else {
    // console.log(src);
    // console.log(me?.profile_image_url);
    return (
      <div
        className={cx(
          styles[size],
          " rounded-full flex justify-center items-center  drop-shadow-2xl",
          className
        )}
        onClick={onClick}
      >
        {src ? getIcon(src) : getIcon(me?.profile_image_url) || <DefaultIcon />}
      </div>
    );
  }
};

export default ProfileIcon;
