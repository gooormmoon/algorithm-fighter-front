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
import { modifyPassword, modifyUser } from "../../api/Users";
import axios from "axios";

// interface UserData {
//   id: string;
//   name: string;
//   nickname: string;
//   profileImageUrl?: string;
//   description?: string;
//   createdDate: string;
//   loginDate: string;
// }

//sample data
const exampleData = {
  id: "JohnDoe@example.com",
  name: "John Doe",
  nickname: "구름이",
  profileImageUrl: "",
  description: "구름달 구름구름",
  createdDate: "2021-01-01",
  loginDate: "2021-12-31",
};

const MyPageRead: React.FC = () => {
  const { me, setMe } = useMe();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nickname, handleNicknameChange] = useInputChange(me.nickname);
  const [description, handleDescriptionChange] = useInputChange(me.description);
  const [password, handlePasswordChange, setPassword] = useInputChange("");
  const [profileImage, setProfileImage] = useState<string | null>("");
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

  useEffect(() => {
    if (
      nickname !== exampleData.nickname ||
      description !== exampleData.description ||
      profileImage !== exampleData.profileImageUrl
    ) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [nickname, description, profileImage]);

  // api get
  // const [data, setData] = useState<UserData | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getMe();
  //       if (response.status === 200) {
  //         const data = response.data;
  //         setData(data);
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         if (error.response && error.response.status === 401) {
  //           console.error("Unauthorized:", error.message);
  //         } else if (error.response && error.response.status === 404) {
  //           console.error("Not Found:", error.message);
  //         } else {
  //           console.error("An unexpected error occurred:", error.message);
  //         }
  //         throw new Error(error.message);
  //       } else {
  //         throw new Error("An unexpected non-Axios error occurred");
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);
  // if (!data) {
  //   return <div>Loading...</div>;
  // }

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

  // 유효성 검사
  const validateAndSetError = () => {
    setErrorMessages({
      password: validatePassword(password) || undefined,
      passwordCheck:
        validateCheckpassword(passwordCheck, password) || undefined,
    });
  };
  //유효성검사 - 커서 벗어났는지
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

    if (!errorMessages.password && !errorMessages.passwordCheck) {
      try {
        await modifyPassword(password);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response)
          if (
            error.response.status === 401 &&
            error.response.data?.description === "토큰이 없거나 잘못된 토큰임"
          ) {
            throw Error("잘못된 요청입니다" + error.message);
          } else if (
            error.response.status === 404 &&
            error.response.data?.description === "해당하는 유저를 찾을 수 없음"
          ) {
            throw Error("잘못된 사용자 입니다." + error.message);
          } else {
            throw new Error("예상치 못한 오류가 발생했습니다.");
          }
      }
    } else {
      alert("입력한 비밀번호를 확인하세요");
    }
    /*body 필수
      name
      nickname
      profileImageUrl
      description*/
    try {
      const response = await modifyUser({
        // name: { UserData.name },
        nickname: nickname,
        profileImageUrl: uploadedFile,
        description: description,
      });
      if (response.status === 200) {
        alert("변경되었습니다!");
        if (response.status === 200) {
          const data = response.data;
          // setData(data);
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        if (
          error.response.status === 401 &&
          error.response.data?.description === "토큰이 없거나 잘못된 토큰임"
        ) {
          throw Error("잘못된 요청입니다" + error.message);
        } else if (
          error.response.status === 404 &&
          error.response.data?.description === "해당하는 유저를 찾을 수 없음"
        ) {
          throw Error("잘못된 사용자 입니다." + error.message);
        } else {
          throw new Error("예상치 못한 오류가 발생했습니다.");
        }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className={`mt-6 p-6 rounded-lg max-w-2xl shadow-2xl drop-shadow-2xl 
        ${theme === "dark" && "bg-dark_box"}`}
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
            label="닉네임"
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
          />

          <TextAreaField
            label="소개"
            placeholder="소개"
            value={description}
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
      </div>
      <MembershipWithdrawalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={""} //data.id
      />
    </>
  );
};
export default MyPageRead;
