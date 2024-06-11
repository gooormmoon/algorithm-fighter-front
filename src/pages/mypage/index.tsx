import React from "react";
import Input from "../../components/Common/input/Input";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const MyPage: React.FC = () => {
  const exampleData = {
    nickname: "구름이",
    intro: "구름달 구름구름",
    password: "0000",
    confirmPassword: "0000",
  };

  //상태
  const [nickname, setNickname] = useState(exampleData.nickname);
  const [intro, setIntro] = useState(exampleData.intro);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

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

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
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
      confirmPassword,
    };

    if (formData.confirmPassword !== formData.password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      setPassword("");
      setConfirmPassword("");
      console.log(formData);
      alert("Changes saved!");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
                  src="https://pixabay.com/get/ge022a8ceebb8c58c004d568aa078f8d688270f9da182bc32ecc3913f450378685080ad045dd313f69b6f7eef55e031b9a8e7aa1ed709e8852203ca6f3dd4fcdcc7b54f51935f25b17280445e8fe4ef71_640.png"
                  alt="Upload Icon"
                  className="w-6 h-6 object-cover"
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
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
              style="w-full p-2 border border-gray-300 rounded"
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
          <div className="flex items-center ">
            <label className="block text-gray-700 w-32">비밀번호</label>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              style={`border p-2 flex-1 rounded ${
                passwordMismatch ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="mb-4 flex flex-col">
            <div className="flex items-center">
              <label className="block text-gray-700 w-32">비밀번호 확인</label>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                style={`border p-2 flex-1 rounded ${
                  passwordMismatch ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {passwordMismatch && (
              <div className="mb-4 text-red-500">
                입력한 비밀번호가 서로 다릅니다. 확인해주세요.
              </div>
            )}
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
    </div>
  );
};

export default MyPage;
