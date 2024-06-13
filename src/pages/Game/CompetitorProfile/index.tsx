import React from "react";
import { ProfileIcon } from "../../../components/Common";

const CompetitorProfile = () => {
  return (
    <div className="w-full h-full bg-gray-900 rounded-xl flex justify-start gap-4 items-center p-4 opacity-90 ">
      <ProfileIcon size="large" />
      <div className="flex flex-col gap-4 h-full justify-start items-start">
        <p className="text-white text-3xl ">구름달님</p>
        <p className="text-white ">부가 정보</p>
      </div>
    </div>
  );
};

export default CompetitorProfile;
