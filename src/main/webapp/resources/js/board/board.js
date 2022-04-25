"use strict";
window.onload = function () {
    fetch("/board/getList", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => new Board().drawGrid(data))
        .catch((error) => console.log(error));
};
/**
 * @description : json으로 받아온 데이터를 그리는 함수
 */
class Board {
    constructor() {
        this.element = document.querySelector("#board");
        this.element.addEventListener("click", (e) => {
            let data = e.target.parentElement.getAttribute("data-id");
            console.log(data);
        });
    }
    drawGrid(data) {
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
        this.element.insertAdjacentHTML("afterbegin", htmlCode);
    }
}
//# sourceMappingURL=board.js.map