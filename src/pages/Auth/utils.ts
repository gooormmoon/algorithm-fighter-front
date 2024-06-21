import { emailRegEx, passwordRegEx } from "../../utils/";

//메시지 지정
export const validateName = (name: string) => {
  if (name === "") {
    return "입력하세요.";
  }
  if (name.length > 10) {
    return "이름은 최대 10자까지 입력 가능";
  }
  return false;
};

export const validateEmail = (email: string) => {
  if (email === "") {
    return "입력하세요.";
  }

  if (!emailRegEx.test(email)) {
    return "정확한 이메일 주소를 입력하세요.";
  }

  return false;
};

export const validatePassword = (password: string) => {
  if (password === "") {
    return "입력하세요.";
  }

  if (password.match(passwordRegEx) === null) {
    return "숫자, 영문자를 포함하여 8자리 이상입니다.";
  }

  return false;
};

export const validateCheckpassword = (
  password_check: string,
  password: string
) => {
  if (password_check === "") {
    return "입력하세요.";
  }

  if (password_check === password) {
    return false;
  }

  return "비밀번호가 일치하지 않습니다.";
};
