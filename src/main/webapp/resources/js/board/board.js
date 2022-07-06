window.onload = () => {
    new List();
};
export const chageDate = (param) => {
    const date = new Date(param);
    const YYYY = date.getFullYear();
    const MM = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
    const DD = date.getDate();
    return `${YYYY}-${MM}-${DD}`;
};
class List {
    constructor() {
        var _a, _b, _c;
        //목록
        this.element = document.querySelector("#board");
        //등록
        this.regBtb = document.querySelector("#regBtn");
        //검색
        this.searchBtn = document.querySelector("#searchBtn");
        this.searchTypeVal = "A";
        this.searchVal = "";
        //페이징 데이터 초기화
        this.pageData = {
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
        let localPageNum = 1;
        if (localStorage.getItem("getBoard")) {
            localPageNum = (_a = Number(localStorage.getItem("localPageNum"))) !== null && _a !== void 0 ? _a : 1;
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
                const searchType = document.querySelector("#searchBox select[name='type']");
                const searchInput = document.querySelector("#searchBox input[name='keyword']");
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
            (_b = this.element) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
                var _a, _b;
                let bno = e.target.parentElement.getAttribute("data-id");
                localStorage.setItem("bno", bno);
                localStorage.setItem("localPageNum", (_b = (_a = document.querySelector(".pagination .active")) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : "1");
                location.href = "/board/get";
            });
        }
        //등록 클릭
        if (this.regBtb instanceof HTMLButtonElement) {
            (_c = this.regBtb) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
                location.href = "/board/register";
            });
        }
        /** -- NaviClick -- */
        const pageNav = document.querySelector(".pagination");
        if (pageNav instanceof HTMLUListElement) {
            pageNav.addEventListener("click", (e) => {
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
                }
                else if (pageNavClassList.contains("page-item")) {
                    //페이지 번호
                    targetParent.classList.add("active");
                    localPageNum = targetParent.textContent;
                    pagingObj.pageNum = Number(e.target.text);
                }
                else if (pageNavClassList.contains("next")) {
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
    getList(pageData) {
        var _a, _b;
        fetch("/board/getList", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pageNum: pageData["pageNum"],
                amount: pageData["amount"],
                type: (_a = pageData["type"]) !== null && _a !== void 0 ? _a : "",
                keyword: (_b = pageData["keyword"]) !== null && _b !== void 0 ? _b : "",
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
    drawPageNavi(data) {
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
                liHTML += `<li class="page-item ${i - 1 === data["cri"]["pageNum"] / 10 ? "active" : ""}"><a class="page-link" href="#" >${i}</a></li>`;
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
    drawGrid(data) {
        if (this.element instanceof HTMLElement) {
            this.element.innerHTML = "";
        }
        let htmlCode = "";
        for (let i in data) {
            htmlCode += `<tr data-id=${data[i]["bno"]}>`;
            htmlCode += "<td>";
            htmlCode +=
                data[i]["title"] +
                    `   <b style="color:var(--blue);">[ ${data[i]["replyCnt"]} ]</b>`;
            htmlCode += "</td>";
            htmlCode += "<td>";
            htmlCode += data[i]["writer"];
            htmlCode += "</td>";
            htmlCode += "<td>";
            htmlCode += chageDate(Number(data[i]["regdate"]));
            htmlCode += "</td>";
            htmlCode += "<td>";
            htmlCode += chageDate(Number(data[i]["updatedate"]));
            htmlCode += "</td>";
            htmlCode += "</tr>";
        } //for
        if (this.element instanceof HTMLElement) {
            this.element.innerHTML = htmlCode;
        }
    }
}
//# sourceMappingURL=board.js.map