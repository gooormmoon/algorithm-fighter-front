import React, { useState } from "react";
import { Modal } from "../../../components/Common";
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
} from "../../../assets/profileIcons";

interface ProfileIconModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (icon: React.ReactNode) => void;
}

const ProfileIconModal: React.FC<ProfileIconModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <div className="grid grid-cols-4 gap-4">
        {icons.map((icon) => (
          <div
            key={icon.id}
            onClick={() => onSelect(icon.icon)}
            className="cursor-pointer"
          >
            {icon.icon}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ProfileIconModal;
