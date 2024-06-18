
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Common";
import ImageUpload from "../MyPageUpdate/ImageUpload";
import InputField from "../MyPageUpdate/InputField";
import TextAreaField from "../MyPageUpdate/TextAreaField";
import MembershipWithdrawalModal from "../MembershipWithdrawalModal";


import { getMe } from "../../../api/Users";

interface UserData {
  id: string;
  name: string;
  nickname: string;
  profileImageUrl?: string;
  description?: string;
  createdDate: string;
  loginDate: string;
}

const MyPageRead: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  // function getErrorMessage(error: unknown) {
  //   if (error instanceof Error) return error.message;
  //   return String(error);
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMe();
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error: any) {
        // if (error instanceof Error){}
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized:", error.message);
        }
        if (error.response && error.response.status === 404) {
          console.log("Not Found:", error.message);
        }
      }
    };

    fetchData();
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
 
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-transparent p-6 rounded-lg max-w-2xl shadow-2xl drop-shadow-2xl">
      <div className="flex justify-center mb-4">
        <ImageUpload profileImage={data.profileImageUrl as string} />
      </div>
      <div className="flex items-center text-center w-[488px] mb-4">
        <div className="block w-32">id</div>
        <div className="py-2 w-[360px]">{data.id}</div>
      </div>
      <div className="flex items-center text-center w-[488px] mb-4">
        <div className="block w-32">name</div>
        <div className="py-2 w-[360px]">{data.name}</div>
      </div>
      <div className="flex items-center text-center w-[488px] mb-4">
        <div className="block w-32">nickname</div>
        <div className="py-2 w-[360px]">{data.nickname}</div>
      </div>
      <div className="flex items-center text-center w-[488px] mb-4">
        <div className="block w-32">description</div>
        <div className="py-2 w-[360px]">{data.description}</div>
      </div>
      <div className="flex items-center text-center w-[488px] mb-4">
        <div className="block w-32">createdDate</div>
        <div className="py-2 w-[360px]">{data.createdDate}</div>
      </div>
      <div className="flex items-center text-center w-[488px] mb-4">
        <div className="block w-32">loginDate</div>
        <div className="py-2 w-[360px]">{data.loginDate}</div>
      </div>

      <form>
        <InputField
          label="id"
          type="text"
          placeholder="id"
          value={data.id}
          disabled={true}
        />

        <InputField
          label="이름"
          type="text"
          placeholder="이름"
          value={data.name}
          disabled={true}
        />
        <InputField
          label="닉네임"
          type="text"
          placeholder="닉네임"
          value={data.nickname}
          disabled={true}
        />

        <TextAreaField
          label="소개"
          placeholder="소개"
          value={data.description as string}
          disabled={true}
        />
        {/* description */}
        <InputField
          label="회원가입 날짜"
          type="text"
          placeholder="회원가입 날짜"
          value={data.createdDate}
          disabled={true}
        />
        <InputField
          label="마지막 로그인 "
          type="text"
          placeholder="마지막 로그인 "
          value={data.loginDate}
          disabled={true}
        />
      </form>

        <div className="m-2 p-2 flex flex-col gap-2 items-center">
          <Button
            type="button"
            size="medium_big_radius"
            color="secondary"
            textColor="primary_font"
            name="수정하기"
            onClick={() => navigate("/mypageUpdate")}
          />
          <Button
            type="button"
            size="medium_big_radius"
            color="secondary_border"
            textColor="secondary_color_font"
            name="뒤로가기"
            onClick={handleCancel}
          />
        </div>
        <button
          className="flex text-gray-500 underline ml-auto"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          회원탈퇴
        </button>
      </div>
      <MembershipWithdrawalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MyPageRead;
