import { fetchHead } from "../common/common.js";
let fetchFunc = (url) => { };
window.onload = function () {
    fetch("/board/getList", fetchHead)
        .then((response) => response.json())
        .then((data) => new Board().drawGrid(data))
        .catch((error) => console.log(error));
};
class Board {
    constructor() {
        var _a;
        this.element = document.querySelector("#board");
        if (this.element instanceof HTMLElement) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
                let data = e.target.parentElement.getAttribute("data-id");
                console.log(data);
            });
        }
    }
    drawGrid(data) {
        var _a;
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
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("afterbegin", htmlCode);
    }
}
//# sourceMappingURL=board.js.map