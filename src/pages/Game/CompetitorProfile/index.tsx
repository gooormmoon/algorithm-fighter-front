import React, { useState } from "react";
import { ProfileIcon } from "../../../components/Common";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import MinimizeIcon from "@mui/icons-material/Minimize";

const CompetitorProfile = () => {
  const [fold, setFold] = useState(false);
  return fold ? (
    <div className="w-[40px] h-[40px] bg-gray-900 rounded-xl flex justify-center  items-center  opacity-90 transition-all ease-in-out ">
      <button className="cursor-pointer" onClick={() => setFold(false)}>
        <ProfileIcon size="small" />
      </button>
    </div>
  ) : (
    <div className="w-full h-full bg-gray-900 rounded-xl flex justify-start gap-4 items-center p-4 opacity-90 transition-all ease-in-out">
      <ProfileIcon size="large" />
      <div
        className="flex flex-col gap-4 h-full justify-start items-start
      transition-all duration-500
      "
      >
        <p
          className={`  transition-all duration-500
      " text-3xl ${fold ? "text-transparent" : "text-white"}`}
        >
          구름달님
        </p>
        <p
          className={`   transition-all duration-500
      " ${fold ? "text-transparent" : "text-white"}`}
        >
          부가 정보
        </p>
      </div>
      <div className="w-4 h-full relative left-12 top-2 bg-gray flex flex-col justify-end">
        <button
          className="cursor-pointer text-white"
          onClick={() => setFold(true)}
        >
          <MinimizeIcon />
        </button>
      </div>
    </div>
  );
};

export default CompetitorProfile;
