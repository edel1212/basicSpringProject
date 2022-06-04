window.onload = () => {
  if (!localStorage.getItem("bno")) location.href = "404Page";
  new Board();
  new Reply();
  localStorage.setItem("getBoard", "true");
};

type ReplyData = {
  rno?: string;
  bno: string;
  reply: string;
  replyer: string;
  replyDate?: string;
  updateDate?: string;
};

class Board {
  private bno = localStorage.getItem("bno");
  private title = document.querySelector(
    "input[name=title]"
  ) as HTMLInputElement;
  private content = document.querySelector(
    "textarea[name=content]"
  ) as HTMLTextAreaElement;
  private writer = document.querySelector(
    "input[name=writer]"
  ) as HTMLInputElement;
  private modify = document.querySelector("#modify");
  private delete = document.querySelector("#delete");
  private list = document.querySelector("#list");
  private modiBtnChang = false;
  constructor() {
    /**
     * get board
     */
    fetch("/board/get", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: String(this.bno),
    })
      .then((response) => response.json())
      .then((result) => {
        this.title.value = result["title"];
        this.content.value = result["content"];
        this.writer.value = result["writer"];
      })
      .catch((error) => {
        console.log(error);
        location.href = "404Page";
      });

    /**
     * btn Event
     */
    if (this.modify instanceof HTMLButtonElement) {
      this.modify.addEventListener("click", () => {
        if (!this.modiBtnChang) {
          const modifyFlag = confirm(`해당 게시물을 수정 하시겠습니까?`);
          if (modifyFlag) {
            this.title.readOnly = false;
            this.content.readOnly = false;
            //modify btn Flag change
            this.modiBtnChang = true;
            if (this.modify instanceof HTMLButtonElement) {
              this.modify.innerHTML = "Change";
            }
          }
        } else {
          const modifyFlag = confirm(`해당 게시물을 수정을 완료하시겠습니까?`);
          if (modifyFlag) {
            const modiObj = {
              bno: localStorage.getItem("bno"),
              title: this.title.value,
              content: this.content.value,
              writer: this.writer.value,
            };
            fetch("/board/modify", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(modiObj),
            })
              .then((response) => response.json())
              .then((result) => {
                console.log(`result ===> ${result}`);
                if (result === 1) {
                  alert("수정에 성공하였습니다.");
                } else {
                  alert("수정에 실패하였습니다");
                }
                location.href = "/board/list";
              });
          }
        }
      });
    }
    if (this.delete instanceof HTMLButtonElement) {
      this.delete.addEventListener("click", () => {
        const deleteFlag = confirm(`해당 게시물을 삭제 하시겠습니까?`);
        if (deleteFlag) {
          fetch("/board/delete", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: String(this.bno),
          })
            .then((response) => response.json())
            .then((result) => {
              if (result === 1) {
                alert("삭제에 성공하였습니다.");
                location.href = "/board/list";
              } else {
                alert("삭제에 실패하였습니다");
              }
            })
            .catch((error) => console.log(error));
        } //if
      });
    }
    if (this.list instanceof HTMLButtonElement) {
      this.list.addEventListener("click", () => {
        location.href = "/board/list";
      });
    }
  }
}

class Reply {
  private bno = localStorage.getItem("bno");
  private replyData: ReplyData = {
    bno: String(this.bno),
    reply: "TODO regiser User",
    replyer: "TODO regiser User",
  };
  constructor() {
    this.drawReply();
    /** btn Event */
    //add Reply
    const addReplyBtn = document.querySelector("#addReply");
    if (addReplyBtn instanceof HTMLButtonElement) {
      addReplyBtn.addEventListener("click", () => {
        const replyText = document.querySelector("#replyText");
        if (replyText instanceof HTMLTextAreaElement) {
          const text = replyText.value;
          if (replyText.value === "") {
            alert("공백입니다.");
            return;
          }
          this.replyData["reply"] = text;
        }
        fetch("/reply/registerReply", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.replyData),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result === 1) {
              alert("등록에 성공하였습니다.");
            } else {
              alert("등록에 실패하였습니다");
            }
            this.drawReply();
          })
          .catch((error) => console.error(error));
      });
    }
  }
  /**draw Reply List */
  drawReply() {
    fetch("/reply/getReply", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.replyData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.result.length) return;
        const ul = document.querySelector(".chat");
        if (ul instanceof HTMLUListElement) {
          ul.innerHTML = "";
          let HTMLLiElem = "";
          for (let i of result.result) {
            HTMLLiElem += "<li class='left clear-fix' data-rno='0'>";
            HTMLLiElem += "<div>";
            HTMLLiElem += "<div class='header'>";
            HTMLLiElem += `<strong class='primery-font'>${i["replyer"]}</strong>`;
            HTMLLiElem += `<small class='pull-right text-muted'>${i["updateDate"]}</small>`;
            HTMLLiElem += "</div>";
            HTMLLiElem += `<p>${i["reply"]}</p>`;
            HTMLLiElem += "</div>";
            HTMLLiElem += "</li>";
          }
          ul.innerHTML = HTMLLiElem;
        }
      })
      .catch((error) => console.log(error));
  }
}

/**
 * @description : 수정 후 뒤로가기 버튼 사용시
 *                다시 modifyPage로 이동하는 문제를 발견
 *                따라서 해당 페이지에 들어올 경우 history를
 *                /board/list로 변경하는 방법을 사용함
 */
history.replaceState(null, "goList", "/board/list");
