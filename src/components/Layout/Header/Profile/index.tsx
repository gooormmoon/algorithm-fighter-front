import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileIcon } from "../../../Common";
import { useTheme } from "../../../../store/store";
const Profile = () => {
  const { theme, changeTheme } = useTheme();
  return (
    <section
      className={`w-[300px] h-[360px] z-30 absolute top-16 right-4  p-4 shadow-md  ${
        theme === "dark"
          ? "bg-secondary text-white border-white"
          : "bg-white text-secondary border-secondary"
      } `}
    >
      <ul className="flex flex-col   w-full h-full justify-between items-center ">
        <li className="w-full h-2/3 flex flex-col gap-4 border-b-2 border-gray-300 text-left">
          <ProfileIcon size="large" />
          <p className="text-xl">구름달님</p>
          <p>프론트엔드 웹 풀스택</p>
        </li>
        <li className="w-full h-12 flex items-center text-lg  border-b-2 border-gray-300 text-left ">
          <Link to="/mypage">마이 페이지</Link>
        </li>
        <li className="w-full  h-12 flex items-center text-lg  border-gray-300 text-left">
          <Link to="/logout">로그아웃</Link>
        </li>
      </ul>
    </section>
  );
};

export default Profile;
