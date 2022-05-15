type list = [
  {
    bno: string;
    title: string;
    writer: string;
    regdate: string;
    updatedate: string;
  }
];

window.onload = () => {
  let list = new List();
};

class List {
  private element = document.querySelector("#board");
  private regBtb = document.querySelector("#regBtn");
  constructor() {
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
      this.element?.addEventListener("click", (e: any) => {
        let bno = e.target.parentElement.getAttribute("data-id");
        localStorage.setItem("bno", bno);
        location.href = "/board/get";
      });
    }
    if (this.regBtb instanceof HTMLButtonElement) {
      this.regBtb?.addEventListener("click", () => {
        location.href = "/board/register";
      });
    }
  }
  /**
   * draw list
   */
  drawGrid(data: list) {
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

/***
 * @Todo : https://heewon26.tistory.com/293?category=797491 확인하자 ..
 */
history.pushState(null, "", "");
window.onpopstate = function (event) {
  debugger;
  const prevUrl = document.referrer;
  if (prevUrl.indexOf("board/list") < 0) {
    //뒤로가기를 한 페이지가 test.do 페이지가 아니면 뒤로가기, test.do 페이지면 새로고침합니다.
    history.back();
  } else {
    location.href = prevUrl;
  }
};
