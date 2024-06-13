// <<<<<<< HEAD
// import React, { useState } from 'react';
// import Button from './components/Common/button/Button';
// =======
import React from "react";
import { Modal } from "../src/components/Common/modal/Modal";
import { useState } from "react";

function App() {
  const [buttonText, setButtonText] = useState('대기');

  // 마우스 버튼 위에 올렸을 때
  const handleMouseEnter = () => {
    setButtonText('준비 완료');
  };

  // 마우스 버튼 위에 안 올렸을 때
  const handleMouseLeave = () => {
    setButtonText('대기');
  };

  // 버튼 클릭했을 때
  const handleClick = () => {
    setButtonText('준비 완료');
  };

  return (
// <<<<<<< HEAD
//     <form>
//       <form style={{ marginTop: '20px' }}></form>
//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="large_radius" color="secondary" textColor="primary_font" name="로그인" />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="medium_big_radius" color="secondary" textColor="primary_font" name="회원가입" />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="medium_big_radius" color="secondary_border" textColor="secondary_color_font" name="취소" />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="medium_big_radius" color="secondary" textColor="primary_font" name="저장" />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="medium_small_radius" color="primary" textColor="primary_font" name="코드 생성" />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="medium_small_radius" color="secondary" textColor="primary_font" name="복사" />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="medium_small_radius" color="secondary" textColor="primary_font" name="입력 " />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="medium_big_radius" color="primary" textColor="primary_font" name="게임 시작" />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button
//           size="medium_big_radius"
//           color="wait_border"
//           textColor="wait_color_font"
//           name={buttonText}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           onClick={handleClick}
//         />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="small" color="primary" textColor="secondary_font" name="아이콘" />
//       </div>

//       <div style={{ marginBottom: '10px', textIndent: '1em' }}>
//         <Button size="small_radius" color="primary" textColor="secondary_color_font" name="아이콘" />
//       </div>
//     </form>
// =======
    <div className="text-3xl font-bold underline">
    </div>
  );
}

export default App;
