import apiClient from "../apiClient";

export {};
//MEMO: 사용자 데이터베이스에 새 파일 또는 폴더 생성하기
export const createFile = () => {
  return apiClient.post("/api/file");
};
//MEMO: 파일의 내용 조회
export const getFile = (path: string) => {
  return apiClient.get(`/api/file/${path}`);
};
//MEMO: 디렉토리 하위 파일 조회
export const getFileChidren = (path: string) => {
  return apiClient.get(`/api/file/${path}/chidren`);
};

//NOTE : fileStorageName과 path는 같은 것 같다!

//MEMO: 파일에 내용 쓰기/수정 - body : {name, fileStorageName,content,language}
export const modifyFileContent = (path: string, body: {}) => {
  return apiClient.put(`/api/file/${path}/content`, body);
};
//MEMO: 파일/디렉토리 경로 수정 body : {name, fileStorageName,newPath}
export const modifyFilePath = (path: string, body: {}) => {
  return apiClient.put(`/api/file/${path}/content`, body);
};
//MEMO: 파일 이름 수정 body:{name, fileStorageName,newName}
export const modifyFileName = (path: string, body: {}) => {
  return apiClient.put(`/api/file/${path}/content`, body);
};
//MEMO: 사용자 데이터베이스의 파일 또는 디렉토리 삭제
export const deleteFile = (path: string) => {
  return apiClient.delete(`/api/file/${path}`);
};
