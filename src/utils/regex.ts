export const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i; //제일 많이 보임
export const passwordRegEx =
  // /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,20}$/;
  /^[A-Za-z0-9!@#$%^&*()]{8,20}$/;
//영문,숫자,특수문자 8~20자리수
