//NOTE: 토큰을 저장하는 함수
export const saveTokens = (token: { access_token: string }) => {
  localStorage.setItem("ACCESS_TOKEN", token.access_token);
};

//NOTE: 토큰을 가져오는 함수
export const getTokens = () => {
  const access_token = localStorage.getItem("ACCESS_TOKEN");
  return access_token;
};

//NOTE: 토큰을 삭제하는 함수
export const clearTokens = () => {
  localStorage.removeItem("ACCESS_TOKEN");
};
