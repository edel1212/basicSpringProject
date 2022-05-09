type board = [
  {
    bno: string;
    title: string;
    writer: string;
    regdate: string;
    updatedate: string;
  }
];

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

class Board {
  private element = document.querySelector("#board");
  constructor() {
    if (this.element instanceof HTMLElement) {
      this.element?.addEventListener("click", (e: any) => {
        let data = e.target.parentElement.getAttribute("data-id");
        console.log(data);
      });
    }
  }
  drawGrid(data: board) {
    let htmlCode: string = "";
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
    this.element?.insertAdjacentHTML("afterbegin", htmlCode);
  }
}
