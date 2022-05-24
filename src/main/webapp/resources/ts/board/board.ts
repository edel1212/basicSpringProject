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

type PageData = {
  pageNum: number;
  amount: number;
};

window.onload = () => {
  let list = new List();
};

class List {
  private element = document.querySelector("#board");
  private regBtb = document.querySelector("#regBtn");
  constructor() {
    this.getList({ pageNum: 1, amount: 10 });
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
  getList(pageData: PageData) {
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

  //무조건 10개씩
  // drawPageNum(selectNum: number, endPageNum: number) {
  //   let pagNumEle = document.querySelector(".pagination");
  //   if (pagNumEle instanceof HTMLUListElement) {
  //     let liHTML = "";
  //     for (let selectNum = 0; selectNum < endPageNum; selectNum++) {
  //       // if(){

  //       // }
  //       liHTML += `<li class="page-item"><a class="page-link" href="#" >
  //       ${selectNum + 1}
  //       </a></li>`;
  //     } //for
  //     pagNumEle.innerHTML = liHTML;
  //   }
  // }
}
