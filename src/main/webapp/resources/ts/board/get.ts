window.onload = () => {
  localStorage.setItem("getBoard", "true");
};

type ReplyData = {
  rno?: string;
  bno: string;
  reply: string;
  replyDate?: string;
  updateDate?: string;
};
class Board {
  private files: Array<AttachObj>;
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
  constructor(private bno: string, private userId: string) {
    this.files = [];
    /**
     * get board
     */
    const csrfEle = document.querySelector("#csrfToken");
    let csrfToken = "";
    if (csrfEle instanceof HTMLInputElement) {
      csrfToken = csrfEle.value;
    }
    fetch("/board/get", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: String(this.bno),
    })
      .then((response) => response.json())
      .then((result) => {
        /**content write */
        this.title.value = result["title"];
        this.content.value = result["content"];
        this.writer.value = result["writer"];

        //작성자가 다를경우 수정 및 삭제 불가능
        if (result["writer"] !== userId) {
          document.querySelector("#modify")?.remove();
          document.querySelector("#delete")?.remove();
        }

        /**files section */
        let filesArr = result["attachList"];
        const uploadRstUL = document.querySelector(".uploadResult ul");
        let str = "";
        filesArr.forEach((obj: AttachObj) => {
          //URL encoding
          const FileDownCallPath = encodeURIComponent(
            obj["uploadPath"] + "/" + obj["uuid"] + "_" + obj["fileName"]
          );

          //File의 정보를 가지는 Arr에 기존 File 정보 추가
          this.files.push({
            fileName: obj["fileName"],
            fileType: obj["fileType"],
            uploadPath: obj["uploadPath"],
            uuid: obj["uuid"],
          });

          if (!obj["fileType"]) {
            obj.fileType = true;
            str +=
              "<li style='display:flex'><img style='width:25px;margin-right:5px;' src='/resources/img/file.png'>";
            str += "<a href='";
            str += "/board/download?fileName=" + FileDownCallPath;
            str += "'>";
            str += obj["fileName"];
            str += "</a>";
            str +=
              "<button type='button' style='background: none;border: none;color: red;display:none' data-file=";
            str +=
              FileDownCallPath +
              " data-type='file' " +
              "data-uuid=" +
              obj["uuid"];
            str += ">X</button>";
            str += "</li>";
          } else {
            obj.fileType = false;
            const thumFileCallPath = encodeURIComponent(
              obj["uploadPath"] +
                "/" +
                "s_" +
                obj["uuid"] +
                "_" +
                obj["fileName"]
            );
            str += "<li style='display:flex'>";
            str +=
              "<img style='width:25px;margin-right:5px;' src='/board/display?fileName=" +
              thumFileCallPath +
              "'>";
            str += "<a href='";
            str += "/board/download?fileName=" + FileDownCallPath;
            str += "'>";
            str += obj["fileName"];
            str += "</a>";
            str +=
              "<button type='button' style='background: none;border: none;color: red;display:none' data-file=";
            str +=
              thumFileCallPath +
              " data-type='image' " +
              "data-uuid=" +
              obj["uuid"];
            str += ">X</button>";
            str += "</li>";
          } //if-else
        });
        console.log("base Files Info ::: ", this.files);
        if (uploadRstUL instanceof HTMLUListElement) {
          uploadRstUL.insertAdjacentHTML("beforeend", str);
        }
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

            /***
             * 파일 수정 옵션 추가
             */
            //업로드 버튼 생성
            const fileUploadBtn = document.querySelector(".fileWrap");
            fileUploadBtn?.insertAdjacentHTML(
              "beforeend",
              `<div class="panel-body filebox">
                <label for="fileInput">Upload</label>
                <input id="fileInput" type="file" name="uploadFile" multiple >
              </div>`
            );

            document
              .querySelector("#fileInput")
              ?.addEventListener("change", (e) => {
                /** 데이터를 담을 객체 */
                let formData = new FormData();
                /** target Input */
                let inputFile = document.querySelector(
                  "input[name='uploadFile']"
                );

                if (inputFile instanceof HTMLInputElement) {
                  /** 배열 형태로 데이터를 나열 */
                  const files = inputFile.files as any;

                  for (let i of files) {
                    //검사
                    if (!checkExtension(i.name, i.size)) return;
                    //FormData 객체에 파일을 주입
                    formData.append("uploadFile", i);
                  } //for

                  for (let key of formData.keys()) {
                    console.log(key);
                  }
                  for (let value of formData.values()) {
                    console.log(value);
                  }

                  const csrfEle = document.querySelector("#csrfToken");
                  let csrfToken = "";
                  if (csrfEle instanceof HTMLInputElement) {
                    csrfToken = csrfEle.value;
                  }
                  fetch("/board/uploadAction", {
                    method: "POST",
                    cache: "no-cache",
                    headers: {
                      "X-CSRF-TOKEN": csrfToken,
                    },
                    body: formData,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("data", data);
                      //file input 초기화
                      const fileInput = document.querySelector(
                        "input[name='uploadFile']"
                      );
                      if (fileInput instanceof HTMLInputElement) {
                        fileInput.value = "";
                      }

                      //파일 목록 생성
                      const uploadRstUL =
                        document.querySelector(".uploadResult ul");
                      let str = "";
                      data.forEach((obj: AttachObj) => {
                        const FileDownCallPath = encodeURIComponent(
                          obj["uploadPath"] +
                            "/" +
                            obj["uuid"] +
                            "_" +
                            obj["fileName"]
                        );

                        if (!obj["fileType"]) {
                          str +=
                            "<li style='display:flex'><img style='width:25px;margin-right:5px;' src='/resources/img/file.png'>";
                          str += "<a href='";
                          str += "/board/download?fileName=" + FileDownCallPath;
                          str += "'>";
                          str += obj["fileName"];
                          str += "</a>";
                          str +=
                            "<button type='button' style='background: none;border: none;color: red;' data-file=";
                          str +=
                            FileDownCallPath +
                            " data-type='file' " +
                            "data-uuid=" +
                            obj["uuid"];
                          str += ">X</button>";
                          str += "</li>";
                        } else {
                          const thumFileCallPath = encodeURIComponent(
                            obj["uploadPath"] +
                              "/" +
                              "s_" +
                              obj["uuid"] +
                              "_" +
                              obj["fileName"]
                          );
                          str += "<li style='display:flex'>";
                          str +=
                            "<img style='width:25px;margin-right:5px;' src='/board/display?fileName=" +
                            thumFileCallPath +
                            "'>";
                          str += "<a href='";
                          str += "/board/download?fileName=" + FileDownCallPath;
                          str += "'>";
                          str += obj["fileName"];
                          str += "</a>";
                          str +=
                            "<button type='button' style='background: none;border: none;color: red;' data-file=";
                          str +=
                            thumFileCallPath +
                            " data-type='image' " +
                            "data-uuid=" +
                            obj["uuid"];
                          str += ">X</button>";
                          str += "</li>";
                        } //if-else
                        /**전역변수에 파일 등록 */
                        this.files.push(obj);
                      });
                      console.log("register files ::", this.files);
                      if (uploadRstUL instanceof HTMLUListElement) {
                        uploadRstUL.insertAdjacentHTML("beforeend", str);
                      }
                    })
                    .catch((error) => console.log(error));
                }
              });

            //삭제버튼 활성화
            document
              .querySelectorAll(".uploadResult ul li button")
              .forEach((item) => {
                if (item instanceof HTMLElement) {
                  item.style.display = "block";
                }
              });
            //삭제 버튼 Event
            document
              .querySelector(".uploadResult ul")
              ?.addEventListener("click", (e) => {
                const target = e.target as any;
                if (target.nodeName !== "BUTTON") {
                  return;
                }
                //Object에 삭제 데이터 추가 필요
                target.parentElement.remove();
                const data = target.dataset.file;
                const type = target.dataset.type;
                const uuid = target.dataset.uuid;
                let fileObj = { fileName: data, type: type };
                //files 목록에서 uuid 기준으로 삭제
                for (let i = 0; i < this.files.length; i++) {
                  if (this.files[i].uuid === uuid) {
                    this.files.splice(i, 1);
                  }
                }
                console.log("delete Files Info ::: ", this.files);
              });
          }
        } else {
          const modifyFlag = confirm(`해당 게시물을 수정을 완료하시겠습니까?`);
          if (modifyFlag) {
            const modiObj = {
              bno: localStorage.getItem("bno"),
              title: this.title.value,
              content: this.content.value,
              attachList: this.files,
              writer: this.writer.value,
            };

            const csrfEle = document.querySelector("#csrfToken");
            let csrfToken = "";
            if (csrfEle instanceof HTMLInputElement) {
              csrfToken = csrfEle.value;
            }
            fetch("/board/modify", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
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
          const csrfEle = document.querySelector("#csrfToken");
          let csrfToken = "";
          if (csrfEle instanceof HTMLInputElement) {
            csrfToken = csrfEle.value;
          }
          fetch("/board/delete", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": csrfToken,
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
} //Board Class

class Reply {
  private replyData: ReplyData = {
    bno: String(this.bno),
    reply: "",
  };
  constructor(private bno: string, private userId: string) {
    this.drawReply(userId);
    /** btn Event */
    //add Reply
    const addReplyBtn = document.querySelector("#addReply");
    if (addReplyBtn instanceof HTMLButtonElement) {
      addReplyBtn.addEventListener("click", () => {
        const replyText = document.querySelector("#replyText");
        if (replyText instanceof HTMLTextAreaElement) {
          const text = replyText.value;
          if (replyText.value.trim() === "") {
            alert("공백입니다.");
            return;
          }
          this.replyData["reply"] = text;
        }
        const csrfEle = document.querySelector("#csrfToken");
        let csrfToken = "";
        if (csrfEle instanceof HTMLInputElement) {
          csrfToken = csrfEle.value;
        }
        fetch("/reply/registerReply", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify(this.replyData),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result === 1) {
              alert("등록에 성공하였습니다.");
              if (replyText instanceof HTMLTextAreaElement) {
                replyText.value = "";
              }
            } else {
              alert("등록에 실패하였습니다");
            }
            this.drawReply();
          })
          .catch((error) => console.error(error));
      });
    }
    //Modify Or Delete
    const replyWrap = document.querySelector(".chat");
    if (replyWrap instanceof HTMLUListElement) {
      replyWrap.addEventListener("click", (e: any) => {
        const target = e.target as HTMLButtonElement;
        if (target.type !== "button") return;
        const rno = target.parentElement?.dataset.rno ?? "0";
        this.replyData.rno = rno;
        const classArr = target.classList;
        let url = "";
        let message = "";
        if (classArr.contains("replyModify")) {
          let beforeRe =
            target.parentElement?.parentElement?.querySelector("p");
          let replyTxt = "";
          //modify Mod Check
          if (!target.classList.contains("changeMod")) {
            target.classList.add("changeMod");
            debugger;
            const promp = prompt(
              "변경할 내용일 입력해주세요.",
              beforeRe?.textContent ?? ""
            );
            if (beforeRe instanceof HTMLElement) {
              beforeRe.innerText = promp ?? "";
            }
            target.textContent = "Change";
            return;
          }
          url = "modifyReply";
          message = "수정";
          this.replyData.reply =
            beforeRe?.textContent ?? "수정에 문제가 발생하였습니다.";
          target.classList.remove("changeMod");
        } else if (classArr.contains("replyDelete")) {
          //delete
          url = "deleteReply";
          message = "삭제";
        } else {
          alert("Error");
          return;
        }

        const csrfEle = document.querySelector("#csrfToken");
        let csrfToken = "";
        if (csrfEle instanceof HTMLInputElement) {
          csrfToken = csrfEle.value;
        }
        fetch(`/reply/${url}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify(this.replyData),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result === 1) {
              alert(`${message}에 성공하였습니다.`);
            } else {
              alert(`${message}에 실패하였습니다`);
            }
            this.drawReply();
          })
          .catch((error) => console.error(error));
      });
    }
  }
  /**draw Reply List */
  drawReply(userId: string) {
    const csrfEle = document.querySelector("#csrfToken");
    let csrfToken = "";
    if (csrfEle instanceof HTMLInputElement) {
      csrfToken = csrfEle.value;
    }
    fetch("/reply/getReply", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
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
            HTMLLiElem += `<li class='left clear-fix'>`;
            HTMLLiElem += "<div>";
            HTMLLiElem += "<div class='header'>";
            HTMLLiElem += `<strong class='primery-font'>${i["replyer"]}</strong>`;
            HTMLLiElem += `<small class='pull-right text-muted'>
                              ${chageDate(i["updateDate"])}</small>`;
            HTMLLiElem += "</div>";
            HTMLLiElem += `<div class="replyBody">`;
            HTMLLiElem += `<p>${i["reply"]}</p>`;
            if (userId === i["replyer"]) {
              HTMLLiElem += `<div class="btnWrap" data-rno='${i["rno"]}'>`;
              HTMLLiElem += `<button type="button" class="btn btn-default replyModify">Modify</button>`;
              HTMLLiElem += `<button type="button" class="btn btn-default replyDelete">Delete</button>`;
              HTMLLiElem += `</div>`;
            }
            HTMLLiElem += "</div>";
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
