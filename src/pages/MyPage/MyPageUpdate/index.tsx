import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import ImageUpload from "./ImageUpload";
import { Button } from "../../../components/Common";
import useInputChange from "../../../hooks/useInputChange";
import { validatePassword, validateCheckpassword } from "../../Auth/utils";

const exampleData = {
  nickname: "구름이",
  intro: "구름달 구름구름",
  password: "0000",
  password_check: "0000",
};

const MyPageUpdate: React.FC = () => {
  const [nickname, handleNicknameChange] = useInputChange(exampleData.nickname);
  const [intro, handleIntroChange] = useInputChange(exampleData.intro);
  const [password, handlePasswordChange, setPassword] = useInputChange("");
  const [passwordCheck, handlePasswordCheckChange, setPasswordCheck] =
    useInputChange("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({
    password: undefined as string | undefined,
    passwordCheck: undefined as string | undefined,
  });

  // 유효성 검사
  const validateAndSetError = () => {
    setErrorMessages({
      password: validatePassword(password) || undefined,
      passwordCheck:
        validateCheckpassword(passwordCheck, password) || undefined,
    });
  };

  const handleBlur = (field: string) => {
    if (field === "password") {
      setErrorMessages((prev) => ({
        ...prev,
        password: validatePassword(password) || undefined,
      }));
    } else if (field === "passwordCheck") {
      setErrorMessages((prev) => ({
        ...prev,
        passwordCheck:
          validateCheckpassword(passwordCheck, password) || undefined,
      }));
    }
  };

  // 사진 추가 icon 클릭
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

  // 제출
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validateAndSetError();

    if (!errorMessages.password && !errorMessages.passwordCheck) {
      alert("Changes saved!");
      setPassword(""); // 비밀번호 필드 비우기
      setPasswordCheck(""); // 비밀번호 확인 필드 비우기
    } else {
      alert("수정사항을 확인하세요");
    }
  };

  // 뒤로가기
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-300/90 p-6 rounded-lg shadow-lg  max-w-2xl ">

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
          onBlur={() => handleBlur("password")}
          errorText={errorMessages.password}
        />
        <InputField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          onBlur={() => handleBlur("passwordCheck")}
          errorText={errorMessages.passwordCheck}
        />

        <div className="m-2 p-2 flex flex-col gap-2 items-center">
          <Button
            type="submit"
            size="medium_big_radius"
            color="secondary"
            textColor="primary_font"
            name="저장"
          />
          <Button
            type="button"
            size="medium_big_radius"
            color="secondary_border"
            textColor="secondary_color_font"
            name="취소"
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default MyPageUpdate;
