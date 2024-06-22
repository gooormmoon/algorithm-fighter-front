import React, { useState } from "react";
import { ProfileIcon } from "../../../components/Common";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import MinimizeIcon from "@mui/icons-material/Minimize";

const CompetitorProfile = ({ userId }: { userId: string }) => {
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg flex justify-evenly gap-4 items-center p-4 py-8 opacity-90 transition-all ease-in-out">
      <ProfileIcon size="x_large" />
      <div
        className="flex flex-col gap-4 h-full justify-center items-start
      transition-all duration-500
      "
      >
        <p
          className={`transition-all duration-500 text-white
      text-3xl `}
        >
          구름달님
        </p>
        <p
          className={` transition-all duration-500 text-white
      `}
        >
          설명
        </p>
        <p
          className={` transition-all duration-500 text-white
      `}
        >
          부가 정보
        </p>
      </div>
    </div>
  );
};

export default CompetitorProfile;
