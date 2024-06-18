// import { Button } from "../../../components/Common";

// const MyPageUpdate: React.FC = () => {

//   return (
//     <div className="bg-gray-300/90 p-6 rounded-lg shadow-lg  max-w-2xl ">
//       <form onSubmit={handleSubmit}>
//         <ImageUpload
//           profileImage={profileImage}
//           handleIconClick={handleIconClick}
//           handleFileChange={handleFileChange}
//           fileInputRef={fileInputRef}
//         />

//         <InputField
//           label="닉네임"
//           type="text"
//           placeholder="닉네임"
//           value={nickname}
//           onChange={handleNicknameChange}
//         />

//         <TextAreaField
//           label="소개"
//           placeholder="소개"
//           value={intro}
//           onChange={handleIntroChange}
//         />
//         <InputField
//           label="변경할 비밀번호"
//           type="password"
//           placeholder="변경할 비밀번호"
//           value={password}
//           onChange={handlePasswordChange}
//           onBlur={() => handleBlur("password")}
//           errorText={errorMessages.password}
//         />
//         <InputField
//           label="비밀번호 확인"
//           type="password"
//           placeholder="비밀번호 확인"
//           value={passwordCheck}
//           onChange={handlePasswordCheckChange}
//           onBlur={() => handleBlur("passwordCheck")}
//           errorText={errorMessages.passwordCheck}
//         />

//         <div className="m-2 p-2 flex flex-col gap-2 items-center">

//           <Button
//             type="button"
//             size="medium_big_radius"
//             color="secondary_border"
//             textColor="secondary_color_font"
//             name="취소"
//             onClick={handleCancel}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MyPageUpdate;
import React from "react";

const MyPageUpdate = () => {
  return <div>MyPageUpdate</div>;
};

export default MyPageUpdate;
