"use strict";
//확장자 정규식
const regex = new RegExp("(.*?).(exe|shzip|alz)$");
//5MB
const maxSize = 524880;
//허용 검사
const checkExtension = (fileName, fileSize) => {
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
/***날짜 처리 */
const chageDate = (param) => {
    const date = new Date(param);
    const YYYY = date.getFullYear();
    const MM = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
    const DD = date.getDate();
    return `${YYYY}-${MM}-${DD}`;
};
//# sourceMappingURL=util.js.map