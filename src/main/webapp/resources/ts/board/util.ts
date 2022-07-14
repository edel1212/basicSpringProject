/***File Upload 처리 */
//확장자 정규식
export const regex = new RegExp("(.*?).(exe|shzip|alz)$");
//5MB
export const maxSize = 524880;

//허용 검사
export const checkExtension = (fileName: string, fileSize: number) => {
  if (fileSize >= maxSize) {
    alert("파일사이즈 초과");
    return false;
  }
  if (regex.test(fileName)) {
    alert("해당 종류의 파일은 업로드할 수 없습니다.");
    return false;
  }
  return true;
};
