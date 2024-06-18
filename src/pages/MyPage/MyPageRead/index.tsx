import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Common";
import ImageUpload from "../MyPageUpdate/ImageUpload";
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

  return (
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

      <div className="flex justify-center p-3 space-x-3">
        <Button
          type="button"
          size="medium_big_radius"
          color="secondary_border"
          textColor="secondary_color_font"
          name="뒤로가기"
          onClick={handleCancel}
        />
        <Button
          type="button"
          size="medium_big_radius"
          color="secondary"
          textColor="primary_font"
          name="수정하기"
          onClick={() => navigate("/mypageUpdate")}
        />
      </div>
    </div>
  );
};

export default MyPageRead;
