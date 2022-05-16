"use strict";
window.onload = () => {
    let list = new List();
};
class List {
    constructor() {
        var _a, _b;
        this.element = document.querySelector("#board");
        this.regBtb = document.querySelector("#regBtn");
        fetch("/board/getList", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => this.drawGrid(data))
            .catch((error) => console.log(error));
        /**
         * btn Event
         */
        if (this.element instanceof HTMLElement) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
                let bno = e.target.parentElement.getAttribute("data-id");
                localStorage.setItem("bno", bno);
                location.href = "/board/get";
            });
        }
        if (this.regBtb instanceof HTMLButtonElement) {
            (_b = this.regBtb) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
                location.href = "/board/register";
            });
        }
    }
    /**
     * draw list
     */
    drawGrid(data) {
        var _a;
        let htmlCode = "";
        for (let i in data) {
            htmlCode += `<tr data-id=${data[i]["bno"]}>`;
            htmlCode += "<td>";
            htmlCode += data[i]["rn"];
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