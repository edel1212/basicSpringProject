type list = [
  {
    rn: string;
    bno: string;
    title: string;
    writer: string;
    regdate: string;
    updatedate: string;
  }
];

window.onload = () => {
  let endPageNum = new EndPageNum();
  endPageNum.drawPageNum(0, endPageNum.getEndPageNum());
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
    this.element?.insertAdjacentHTML("afterbegin", htmlCode);
  }
}

/**
 * @description : 마지막 페이지 번호를 가져옴
 */
class EndPageNum {
  private endPageNum;
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

  drawPageNum(selectNum: number, endPageNum: number) {
    let pagNumEle = document.querySelector(".pagination");
    if (pagNumEle instanceof HTMLUListElement) {
      let liHTML = "";
      for (let selectNum = 0; selectNum < endPageNum; selectNum++) {
        // if(){

        // }
        liHTML += `<li class="page-item"><a class="page-link" href="#" >
        ${selectNum + 1}
        </a></li>`;
      } //for
      pagNumEle.innerHTML = liHTML;
    }
  }
}
