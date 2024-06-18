import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Common";
import ImageUpload from "../MyPageUpdate/ImageUpload";
import InputField from "../MyPageUpdate/InputField";
import TextAreaField from "../MyPageUpdate/TextAreaField";
import MembershipWithdrawalModal from "../MembershipWithdrawalModal";

const MyPageRead = () => {
  const exampleData = {
    id: "JohnDoe@example.com",
    name: "John Doe",
    nickname: "구름이",
    profileImageUrl: "",
    description: "구름달 구름구름",
    createdDate: "2021-01-01",
    loginDate: "2021-12-31",
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-transparent p-6 rounded-lg  max-w-2xl shadow-2xl drop-shadow-2xl">
        <div className="flex justify-center mb-4">
          <ImageUpload profileImage={exampleData.profileImageUrl} />
        </div>
        <div className="flex items-center text-center w-[488px] mb-4">
          <div className="block w-32">id</div>
          <div className="py-2 w-[360px]">{exampleData.id}</div>
        </div>
        <div className="flex items-center text-center w-[488px] mb-4">
          <div className="block w-32">name</div>
          <div className="py-2 w-[360px]">{exampleData.name}</div>
        </div>
        <div className="flex items-center text-center w-[488px] mb-4">
          <div className="block w-32">nickname</div>
          <div className="py-2 w-[360px]">{exampleData.nickname}</div>
        </div>
        <div className="flex items-center text-center w-[488px] mb-4">
          <div className="block w-32">description</div>
          <div className="py-2 w-[360px]">{exampleData.description}</div>
        </div>
        <div className="flex items-center text-center w-[488px] mb-4">
          <div className="block w-32">createdDate</div>
          <div className="py-2 w-[360px]">{exampleData.createdDate}</div>
        </div>
        <div className="flex items-center text-center w-[488px] mb-4">
          <div className="block w-32">loginDate</div>
          <div className="py-2 w-[360px]">{exampleData.loginDate}</div>
        </div>

        <form>
          <InputField
            label="id"
            type="text"
            placeholder="id"
            value={exampleData.id}
            disabled={true}
          />

          <InputField
            label="이름"
            type="text"
            placeholder="이름"
            value={exampleData.name}
            disabled={true}
          />
          <InputField
            label="닉네임"
            type="text"
            placeholder="닉네임"
            value={exampleData.nickname}
            disabled={true}
          />

          <TextAreaField
            label="소개"
            placeholder="소개"
            value={exampleData.description}
            disabled={true}
          />
          {/* description */}
          <InputField
            label="회원가입 날짜"
            type="text"
            placeholder="회원가입 날짜"
            value={exampleData.createdDate}
            disabled={true}
          />
          <InputField
            label="마지막 로그인 "
            type="text"
            placeholder="마지막 로그인 "
            value={exampleData.loginDate}
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
