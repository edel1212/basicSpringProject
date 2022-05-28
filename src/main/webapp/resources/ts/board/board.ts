type BoardList = [
  {
    rn: string;
    bno: string;
    title: string;
    writer: string;
    regdate: string;
    updatedate: string;
  }
];

type PageNum = {
  pageNum: number;
  amount: number;
};

type PageData = {
  startPage: number;
  endPage: number;
  prev: boolean;
  next: boolean;
  total: number;
  cri: {
    pageNum: number;
    amount: number;
  };
};

window.onload = () => {
  new List();
};

class List {
  private element = document.querySelector("#board");
  private regBtb = document.querySelector("#regBtn");
  private pageData: PageData = {
    startPage: 0,
    endPage: 0,
    prev: false,
    next: false,
    total: 0,
    cri: {
      pageNum: 0,
      amount: 0,
    },
  };
  constructor() {
    let localPageNum = localStorage.getItem("localPageNum");
    this.getList({
      pageNum: localPageNum ? Number(localPageNum) : 1,
      amount: 10,
    });
    /**
     * btn Event
     */
    /** -- boardClick -- */
    //목록 클릭
    if (this.element instanceof HTMLElement) {
      this.element?.addEventListener("click", (e: any) => {
        let bno = e.target.parentElement.getAttribute("data-id");
        localStorage.setItem("bno", bno);
        localStorage.setItem(
          "localPageNum",
          document.querySelector(".pagination .active")?.textContent ?? "1"
        );
        location.href = "/board/get";
      });
    }
    //등록 클릭
    if (this.regBtb instanceof HTMLButtonElement) {
      this.regBtb?.addEventListener("click", () => {
        location.href = "/board/register";
      });
    }

    /** -- NaviClick -- */
    const pageNav = document.querySelector(".pagination");
    if (pageNav instanceof HTMLUListElement) {
      pageNav.addEventListener("click", (e: any) => {
        //active Class reset
        document.querySelectorAll(".page-item").forEach((ele) => {
          ele.classList.remove("active");
        });
        const targetParent = e.target.parentElement;
        const pageNavClassList = targetParent.classList;
        if (pageNavClassList.contains("previous")) {
          localStorage.setItem(
            "localPageNum",
            String(Number(this.pageData["startPage"]) - 1)
          );
          this.getList({
            pageNum: Number(this.pageData["startPage"]) - 1,
            amount: 10,
          });
        } else if (pageNavClassList.contains("page-item")) {
          targetParent.classList.add("active");
          localStorage.setItem("localPageNum", targetParent.textContent);
          this.getList({ pageNum: Number(e.target.text), amount: 10 });
        } else if (pageNavClassList.contains("next")) {
          localStorage.setItem(
            "localPageNum",
            String(Number(this.pageData["endPage"]) + 1)
          );
          this.getList({
            pageNum: Number(this.pageData["endPage"]) + 1,
            amount: 10,
          });
        } else {
          localStorage.setItem("localPageNum", "1");
          this.getList({
            pageNum: 1,
            amount: 10,
          });
        }
      });
    }
  }
  /** -- list func -- */
  getList(pageData: PageNum) {
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
        this.drawGrid(data["list"]);
        this.drawPageNavi(data["pageMaker"]);
        this.pageData = data["pageMaker"];
      })
      .catch((error) => console.log(error));
  }

  /**
   * draw pageNavi
   */
  drawPageNavi(data: PageData) {
    let pagNumEle = document.querySelector(".pagination");
    if (pagNumEle instanceof HTMLUListElement) {
      let liHTML = "";

      if (data["prev"]) {
        liHTML += `<li class="pagiante_button previous">
                      <a class="page-link" href="#">
                        Previous
                      </a>
                    </li>`;
      }

      for (let i = data["startPage"]; i <= data["endPage"]; i++) {
        liHTML += `<li class="page-item ${
          i - 1 === data["cri"]["pageNum"] / 10 ? "active" : ""
        }"><a class="page-link" href="#" >${i}</a></li>`;
      } //for

      if (data["next"]) {
        liHTML += `<li class="pagiante_button next">
                      <a class="page-link" href="#"  >
                        Next
                      </a>
                    </li>`;
      }

      pagNumEle.innerHTML = liHTML;
    }
  }

  /**
   * draw list
   */
  drawGrid(data: BoardList) {
    if (this.element instanceof HTMLElement) {
      this.element.innerHTML = "";
    }
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
    if (this.element instanceof HTMLElement) {
      this.element.innerHTML = htmlCode;
    }
  }
}
