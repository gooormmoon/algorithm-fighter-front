import React from "react";
import Input from "../../components/Common/input/Input";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword, validateCheckpassword } from "../Auth/utils";
import Button from "../../components/Common/button/Button";

const MyPage: React.FC = () => {
  const exampleData = {
    nickname: "구름이",
    intro: "구름달 구름구름",
    password: "0000",
    password_check: "0000",
  };

  //상태
  const [nickname, setNickname] = useState(exampleData.nickname);
  const [intro, setIntro] = useState(exampleData.intro);
  const [password, setPassword] = useState("");
  const [password_check, setpassword_check] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  //유효성 검사
  const validatedPassword = validatePassword(password);
  const validatedCheckpassword = validateCheckpassword(
    password_check,
    password
  );

  //input 입력
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleIntroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntro(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlepassword_checkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setpassword_check(event.target.value);
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 사진 업로드
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //제출
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      uploadedFile,
      nickname,
      intro,
      password,
      password_check,
    };

    if (!validatedCheckpassword && !validatedPassword) {
      setPassword("");
      setpassword_check("");
      console.log(formData);
      alert("Changes saved!");
    } else {
      alert("수정사항을 확인하세요");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <form onSubmit={handleSubmit}>
        {/* 사진 */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={
                profileImage ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />
            <div
              className="absolute bottom-0 right-0 p-1 bg-black rounded-full cursor-pointer"
              onClick={handleIconClick}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/photo-99135_640.png`}
                alt="Upload Icon"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
          {/* 닉네임 */}
          <div className="flex items-center mb-4">
            <label className="block text-gray-700 w-32">닉네임</label>
            <Input
              type="text"
              placeholder="닉네임"
              value={nickname}
              name={nickname}
              onChange={handleNicknameChange}
              size={"10"}

            />
          </div>
        </div>
        {/* 닉네임 */}
        <div className="flex items-center mb-4">
          <label className="block text-gray-700 w-32">닉네임</label>
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            name="test"
            size="small"
          />
        </div>

        {/* 소개 */}
        <div className="flex items-center mb-4">
          <label className="block text-gray-700 w">소개</label>
          <textarea
            placeholder=" 소개"
            value={intro}
            onChange={handleIntroChange}
            className=" w-[195px] h-[73.6px] ml-[111px]  border border-gray-300 rounded"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex items-center mb-5 ">
          <label className="block text-gray-700 w-32 ">변경할 비밀번호</label>
          <Input
            type="password"
            placeholder="변경할 비밀번호"
            value={password}
            onChange={handlePasswordChange}
            name="test"
            size="small"
            errorText={validatedPassword}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-4 flex flex-col">
          <div className="flex items-center">
            <label className="block text-gray-700 w-32">비밀번호 확인</label>
            <Input
              type="password"

              placeholder="비밀번호 확인"
              value={password_check}
              onChange={handlepassword_checkChange}
              name="test"
              size="small"
              errorText={validatedCheckpassword}
            />
          </div>
        </div>

        <div className="flex justify-center p-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-5"
          >
            저장
          </button>

          {/* 취소 라우팅 아직 */}
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-5"
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPage;
