import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { sizing } from "@mui/system";
import { Link } from "react-router-dom";
const Profile = () => {
  //   const [theme, setTheme] = useState(localStorage.getItem("theme"));
  //   useEffect(() => {
  //     setTheme(localStorage.getItem("theme"));
  //   }, [localStorage.getItem("theme")]);
  return (
    <section
      className={`w-[300px] h-[360px] absolute top-16 right-4  p-4 shadow-md  ${
        localStorage.getItem("theme") === "dark"
          ? "bg-[#213363] text-white border-white"
          : "bg-white text-[#213363] border-[#213363]"
      } `}
    >
      <ul className="flex flex-col   w-full h-full items-center ">
        {/* <img/> */}
        <li className="w-full h-2/3 flex flex-col gap-4 border-b-2 border-gray-400 text-left">
          <div>
            <AccountCircleIcon fontSize="large" />
          </div>
          <p className="text-xl">구름달님</p>
          <p>프론트엔드 웹 풀스택</p>
        </li>
        <li className="w-full h-12 flex items-center text-lg  border-b-2 border-gray-400 text-left ">
          <Link to="/setting">설정</Link>
        </li>
        <li className="w-full  h-12 flex items-center text-lg  border-b-2 border-gray-400 text-left">
          <Link to="/logout">로그아웃</Link>
        </li>
      </ul>
    </section>
  );
};

export default Profile;
