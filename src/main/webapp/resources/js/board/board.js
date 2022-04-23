"use strict";
var _a;
window.onload = function () {
    fetch("/board/getList", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => drawGrid(data))
        .catch((error) => console.log(error));
};
// type test {
//   'a' :number,
//   'b' :number,
// }
/**
 * @description : json으로 받아온 데이터를 그리는 함수
 */
function drawGrid(data) {
    const container = document.querySelector("#board");
    let htmlCode = "";
    for (let i in data) {
        htmlCode += `<tr data-id=${data[i]["bno"]}>`;
        htmlCode += "<td>";
        htmlCode += Number(i) + 1;
        htmlCode += "</td>";
        htmlCode += "<td>";
        htmlCode += data[i]["title"];
        htmlCode += "</td>";
        htmlCode += "<td>";
        htmlCode += data[i]["writer"];
        htmlCode += "</td>";
        htmlCode += "<td>";
        htmlCode += data[i]["regdate"];
        htmlCode += "</td>";
        htmlCode += "<td>";
        htmlCode += data[i]["updatedate"];
        htmlCode += "</td>";
        htmlCode += "</tr>";
    } //for
    container === null || container === void 0 ? void 0 : container.insertAdjacentHTML("afterbegin", htmlCode);
}
(_a = document.querySelector("#board")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    let data = e.target.parentElement.getAttribute("data-id");
    console.log(data);
});
//# sourceMappingURL=board.js.map