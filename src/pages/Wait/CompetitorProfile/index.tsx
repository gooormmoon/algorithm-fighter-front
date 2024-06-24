import React, { useState } from "react";
import { ProfileIcon } from "../../../components/Common";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { useMount } from "react-use";
import { getUser } from "../../../api/Users";
import { toast } from "react-toastify";

const CompetitorProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState({
    nickname: "",
    description: "",
    profile_image_url: "",
  });
  useMount(async () => {
    try {
      const response = await getUser(userId);
      setUser(response.data);
    } catch (err) {
      toast.error("회원 정보 조회 실패");
    }
  });
  return (

    <div className="w-full h-full bg-gray-900 rounded-lg flex justify-evenly gap-4 items-center p-4 py-8 opacity-90 transition-all ease-in-out">
      <ProfileIcon size="x_large" src={user?.profile_image_url} />

      <div
        className='flex flex-col gap-4 h-full justify-center items-start
      transition-all duration-500
      '
      >
        <p
          className={`transition-all duration-500 text-white
      text-3xl `}
        >
          {`${user?.nickname} 님`}
        </p>
        <p
          className={` transition-all duration-500 text-white
      `}
        >
          {`${user?.description || "알고리즘 파이터 초보"}`}
        </p>
        {/* <p
          className={` transition-all duration-500 text-white
      `}
        >
          부가 정보
        </p> */}
      </div>
    </div>
  );
};

export default CompetitorProfile;
