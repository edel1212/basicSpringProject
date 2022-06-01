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
  type?: String;
  keyword?: String;
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
  //목록
  private element = document.querySelector("#board");
  //등록
  private regBtb = document.querySelector("#regBtn");
  //검색
  private searchBtn = document.querySelector("#searchBtn");
  private searchTypeVal = "A";
  private searchVal = "";
  //페이징 데이터 초기화
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
    let localPageNum = 1;
    if (localStorage.getItem("getBoard")) {
      localPageNum = Number(localStorage.getItem("localPageNum")) ?? 1;
      localStorage.removeItem("getBoard");
    }
    this.getList({
      pageNum: localPageNum,
      amount: 10,
    });
    localStorage.removeItem("localPageNum");
    /**
     * btn Event
     */
    //검색 버튼
    if (this.searchBtn instanceof HTMLButtonElement) {
      this.searchBtn.addEventListener("click", () => {
        const searchType = document.querySelector(
          "#searchBox select[name='type']"
        );
        const searchInput = document.querySelector(
          "#searchBox input[name='keyword']"
        );

        if (searchType instanceof HTMLInputElement) {
          this.searchTypeVal = searchType.value;
        }

        if (searchInput instanceof HTMLInputElement) {
          this.searchVal = searchInput.value;
        }

        this.getList({
          pageNum: 1,
          amount: 10,
          type: this.searchTypeVal,
          keyword: this.searchVal,
        });
      });
    }
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
        let pagingObj = {
          pageNum: 1,
          amount: 10,
          type: this.searchTypeVal,
          keyword: this.searchVal,
        };
        let localPageNum = "1";
        if (pageNavClassList.contains("previous")) {
          //이전
          localPageNum = String(Number(this.pageData["startPage"]) - 1);
          pagingObj.pageNum = Number(this.pageData["startPage"]) - 1;
        } else if (pageNavClassList.contains("page-item")) {
          //페이지 번호
          targetParent.classList.add("active");
          localPageNum = targetParent.textContent;
          pagingObj.pageNum = Number(e.target.text);
        } else if (pageNavClassList.contains("next")) {
          //다음
          localPageNum = String(Number(this.pageData["endPage"]) + 1);
          pagingObj.pageNum = Number(this.pageData["endPage"]) + 1;
        }
        this.getList(pagingObj);
        localStorage.setItem("localPageNum", localPageNum);
      }); //pageNav-click Event
    } //pageNav
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
        type: pageData["type"] ?? "",
        keyword: pageData["keyword"] ?? "",
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
