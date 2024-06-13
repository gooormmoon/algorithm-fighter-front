import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import ImageUpload from "./ImageUpload";
import { Button } from "../../components/Common";
import useInputChange from "../../hooks/useInputChange";
import { validatePassword, validateCheckpassword } from "../Auth/utils";

const exampleData = {
  nickname: "구름이",
  intro: "구름달 구름구름",
  password: "0000",
  password_check: "0000",
};

const MyPage: React.FC = () => {
  //상태
  const [nickname, handleNicknameChange] = useInputChange(exampleData.nickname);
  const [intro, handleIntroChange] = useInputChange(exampleData.intro);
  const [password, handlePasswordChange, setPassword] = useInputChange("");
  const [passwordCheck, handlePasswordCheckChange, setPasswordCheck] =
    useInputChange("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  //유효성 검사
  const validatedPassword = validatePassword(password) || undefined;
  const validatedCheckPassword =
    validateCheckpassword(passwordCheck, password) || undefined;

  //사진 추가 icon 클릭
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
      password_check: passwordCheck,
    };

    if (!validatedCheckPassword && !validatedPassword) {
      alert("Changes saved!");
      setPassword(""); // 비밀번호 필드 비우기
      setPasswordCheck(""); // 비밀번호 확인 필드 비우기
    } else {
      alert("수정사항을 확인하세요");
    }
  };

  //뒤로가기
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[full] max-w-2xl ">
      <form onSubmit={handleSubmit}>
        <ImageUpload
          profileImage={profileImage}
          handleIconClick={handleIconClick}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
        />
        <InputField
          label="닉네임"
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <TextAreaField
          label="소개"
          placeholder="소개"
          value={intro}
          onChange={handleIntroChange}
        />
        <InputField
          label="변경할 비밀번호"
          type="password"
          placeholder="변경할 비밀번호"
          value={password}
          onChange={handlePasswordChange}
          errorText={validatedPassword}
        />
        <InputField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          errorText={validatedCheckPassword}
        />

        <div className="flex justify-center p-3 ">
          <div className="mx-3">
            <Button
              type="button"
              size="medium_big_radius"
              color="secondary_border"
              textColor="secondary_color_font"
              name="취소"
              onClick={handleCancel}
            />
          </div>
          <div className="mx-3">
            <Button
              type="submit"
              size="medium_big_radius"
              color="secondary"
              textColor="primary_font"
              name="저장"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyPage;
