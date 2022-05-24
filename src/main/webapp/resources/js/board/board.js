"use strict";
window.onload = () => {
    let list = new List();
};
class List {
    constructor() {
        var _a, _b;
        this.element = document.querySelector("#board");
        this.regBtb = document.querySelector("#regBtn");
        this.getList({ pageNum: 1, amount: 10 });
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
    getList(pageData) {
        fetch("/board/getList", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pageNum: pageData["pageNum"],
                amount: pageData["amount"],
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            console.log("data", data);
            this.drawGrid(data["list"]);
        })
            .catch((error) => console.log(error));
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
/**
 * @description : 마지막 페이지 번호를 가져옴
 */
class EndPageNum {
    constructor() {
        this.endPageNum = 0;
        fetch("/board/getTotalCount", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
            .then((reponse) => reponse.json())
            .then((result) => {
            this.endPageNum = Math.ceil(result / 10);
        })
            .catch((error) => console.log(error));
    }
    getEndPageNum() {
        return this.endPageNum;
    }
}
//# sourceMappingURL=board.js.map