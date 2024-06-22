import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Common";
import ImageUpload from "./MyPageUpdate/ImageUpload";
import InputField from "./MyPageUpdate/InputField";
import TextAreaField from "./MyPageUpdate/TextAreaField";
import MembershipWithdrawalModal from "./MembershipWithdrawalModal";
import useInputChange from "../../hooks/useInputChange";
import { validatePassword, validateCheckpassword } from "../Auth/utils";
import { useMe, useTheme } from "../../store/store";
import { modifyPassword, modifyUser, getMe } from "../../api/Users";
import axios from "axios";
import apiClient from "../../api/apiClient";
import { useMount } from "react-use";
import mime from "mime";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPageRead: React.FC = () => {
  const { me, setMe } = useMe();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [nickname, handleNicknameChange] = useInputChange(me.nickname);
  const [description, handleDescriptionChange] = useInputChange(me.description);
  const [password, handlePasswordChange, setPassword] = useInputChange("");
  const [profileImage, setProfileImage] = useState<string | null>(
    me.profile_image_url
  );
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [passwordCheck, handlePasswordCheckChange, setPasswordCheck] =
    useInputChange("");
  const [errorMessages, setErrorMessages] = useState({
    password: undefined as string | undefined,
    passwordCheck: undefined as string | undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await getMe();
  //       setMe(response.data);
  //       if (response.data.profileImageUrl) {
  //         const filename = response.data.profileImageUrl;
  //         setProfileImage(filename);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user data", error);
  //     }
  //   };
  //   fetchUser();
  // }, []);
  useEffect(() => {
    console.log(me?.profile_image_url);
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setProfileImage(profileImage as string);
    // };
    // reader.readAsDataURL(profileImage);
  }, [me]);

  useEffect(() => {
    if (
      nickname !== me.nickname ||
      description !== me.description ||
      profileImage !== me.profile_image_url
    ) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [nickname, description, profileImage]);

  // 사진 추가 icon 클릭
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if (fileInputRef.current && fileInputRef.current.files) {
    //   const file = fileInputRef.current.files[0];
    //   setUploadedFile(file);
    //   // const reader = new FileReader();
    //   // // reader.onloadend = () => {
    //   // //   setProfileImage(reader.result as string);
    //   // // };
    //   // reader.readAsDataURL(file);
    //   const url = URL.createObjectURL(file);
    //   setProfileImage(url);

    //   window.URL.revokeObjectURL(url);
    // }

    // 희태님 원래코드

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const fileToBlob = async (file: any) =>
        new Blob([new Uint8Array(file)], {
          type: "image/png",
        });
      const blob = await fileToBlob(file);
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);

      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // reader.readAsText(file);
    }
  };

  // 유효성 검사
  const validateAndSetError = () => {
    setErrorMessages({
      password: validatePassword(password) || undefined,
      passwordCheck:
        validateCheckpassword(passwordCheck, password) || undefined,
    });
  };

  const handleImgSrc = (e: any) => {
    setProfileImage(e.target.value);
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

  // 제출
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    validateAndSetError();

    let userChanged = false;
    let passwordChanged = false;

    if (
      nickname !== me.nickname ||
      description !== me.description ||
      profileImage !== me.profile_image_url
    ) {
      userChanged = true;
    }

    if (password) {
      passwordChanged = true;
    }

    try {
      if (userChanged) {
        console.log(typeof profileImage, profileImage);
        console.log(typeof blobUrl, blobUrl);
        const updatedUser = await modifyUser({
          name: me.name,
          nickname: nickname,
          // profileImageUrl: blobUrl,
          profile_image_url: blobUrl,
          // profile_image_url: profileImage,
          description: description || "",
        });
        if (updatedUser.status === 200) {
          const data = updatedUser.data;
          console.log(data);
          setMe({ ...data });
          toast.success("사용자 정보가 성공적으로 변경되었습니다!");
          // URL.revokeObjectURL(blobUrl);
        }
      }
      if (passwordChanged) {
        if (!errorMessages.password && !errorMessages.passwordCheck) {
          await modifyPassword(password);
          toast.success("비밀번호가 성공적으로 변경되었습니다!");
        } else {
          toast.error("입력한 비밀번호를 확인하세요");
          return;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.status === 401 &&
          error.response.data?.description === "토큰이 없거나 잘못된 토큰임"
        ) {
          toast.error("잘못된 요청입니다: " + error.message);
        } else if (
          error.response.status === 404 &&
          error.response.data?.description === "해당하는 유저를 찾을 수 없음"
        ) {
          toast.error("잘못된 사용자 입니다: " + error.message);
        } else {
          toast.error("예상치 못한 오류가 발생했습니다.");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div
      className={`mt-6 p-6 rounded-lg max-w-2xl shadow-2xl drop-shadow-2xl ${
        theme === "dark" && "bg-dark_box"
      }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="items-center justify-center m-0">
          <ImageUpload
            profileImage={profileImage}
            handleIconClick={handleIconClick}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />

          <div className="pb-5 mb-2">
            <div className="text-xl font-bold text-center">{me.name}</div>
            <div className="text-gray-500 text-center">{me.id}</div>
          </div>
        </div>
        <InputField
          label="프로필 이미지"
          type="text"
          placeholder="프로필 이미지 링크"
          value={profileImage || ""}
          onChange={handleImgSrc}
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
          value={description || ""}
          onChange={handleDescriptionChange}
        />

        {showPasswordUpdate && (
          <>
            <InputField
              label="변경할 비밀번호"
              type="password"
              placeholder="변경할 비밀번호"
              value={password}
              onChange={(e) => {
                handlePasswordChange(e);
                setShowSaveButton(true);
              }}
              onBlur={() => handleBlur("password")}
              errorText={errorMessages.password}
            />
            <InputField
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => {
                handlePasswordCheckChange(e);
                setShowSaveButton(true);
              }}
              onBlur={() => handleBlur("passwordCheck")}
              errorText={errorMessages.passwordCheck}
            />
          </>
        )}
        <div className="flex items-center justify-between">
          {!showPasswordUpdate && (
            <InputField
              label="비밀번호"
              type="password"
              placeholder="비밀번호"
              value={"00000000000"}
              onChange={handlePasswordChange}
              disabled={true}
              size="small"
            />
          )}

          <button
            type="button"
            className="flex text-gray-500  ml-auto items-center  w-[40px] h-[40px]"
            onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
          >
            {showPasswordUpdate ? "취소" : "수정"}
          </button>
        </div>
        <div className="m-2 p-2 flex flex-col gap-2 items-center">
          <Button
            type="submit"
            size="medium_big_radius"
            color="primary"
            textColor="primary_font"
            name="저장"
            disabled={!showSaveButton}
          />

          <Button
            type="button"
            size="medium_big_radius"
            color="primary_border"
            textColor="secondary_color_font"
            name="취소"
            onClick={handleCancel}
          />
        </div>
      </form>

      <button
        className="flex text-gray-500 underline ml-auto"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        회원탈퇴
      </button>
      <MembershipWithdrawalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={me.id}
      />
    </div>
  );
};

export default MyPageRead;
