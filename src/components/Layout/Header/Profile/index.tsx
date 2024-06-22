import { Link } from "react-router-dom";
import { ProfileIcon } from "../../../Common";
import { useMe, useTheme } from "../../../../store/store";
const Profile = () => {
  const { theme } = useTheme();
  const { me } = useMe();

  return (
    <section
      className={`w-[300px] h-[360px] z-30 absolute top-16 right-4  p-4 shadow-2xl drop-shadow-2xl  ${
        theme === "dark"
          ? "bg-dark_box text-white border-oc_white"
          : "bg-white text-secondary border-secondary "
      } `}
    >
      <ul className="flex flex-col   w-full h-full justify-between items-center ">
        <li className="w-full h-2/3 flex flex-col gap-4 border-b border-gray-300/55 text-left">
          <ProfileIcon size="large" src={me.profileImageUrl} />
          <p className="text-xl">{me.nickname + " 님"}</p>
          <p>{me.description || "알고리즘 파이터"}</p>
        </li>
        <li className="w-full h-12 flex items-center text-lg  border-b border-gray-300/55 text-left ">
          <Link to="/setting">프로필 설정</Link>
        </li>
        <li className="w-full  h-12 flex items-center text-lg  text-left">
          <Link to="/logout">로그아웃</Link>
        </li>
      </ul>
    </section>
  );
};

export default Profile;
