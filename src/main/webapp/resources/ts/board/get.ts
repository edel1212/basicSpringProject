/**
 * @Todo : history state 적용이 필요해보임!
 */

window.onload = () => {
  let board = new Board();
};

class Board {
  private bno;
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
    if (localStorage.getItem("bno")) {
      this.bno = localStorage.getItem("bno");
    } else {
      location.href = "404Page";
    }
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
            this.modify?.insertAdjacentText("afterend", "\t Finish");
          }
        } else {
          const modifyFlag = confirm(`해당 게시물을 수정을 완료하시겠습니까?`);
          if (modifyFlag) {
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
