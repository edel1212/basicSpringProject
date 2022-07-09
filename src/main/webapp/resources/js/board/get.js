"use strict";
window.onload = () => {
    if (!localStorage.getItem("bno"))
        location.href = "404Page";
    new Board();
    new Reply();
    localStorage.setItem("getBoard", "true");
};
class Board {
    constructor() {
        this.bno = localStorage.getItem("bno");
        this.title = document.querySelector("input[name=title]");
        this.content = document.querySelector("textarea[name=content]");
        this.writer = document.querySelector("input[name=writer]");
        this.modify = document.querySelector("#modify");
        this.delete = document.querySelector("#delete");
        this.list = document.querySelector("#list");
        this.modiBtnChang = false;
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
            /**files section */
            let files = result["attachList"];
            const uploadRstUL = document.querySelector(".uploadResult ul");
            let str = "";
            files.forEach((obj) => {
                const FileDownCallPath = encodeURIComponent(obj["uploadPath"] + "/" + obj["uuid"] + "_" + obj["fileName"]);
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
                }
                else {
                    obj.fileType = false;
                    const thumFileCallPath = encodeURIComponent(obj["uploadPath"] +
                        "/" +
                        "s_" +
                        obj["uuid"] +
                        "_" +
                        obj["fileName"]);
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
                        fileUploadBtn === null || fileUploadBtn === void 0 ? void 0 : fileUploadBtn.insertAdjacentHTML("beforeend", `<div class="panel-body filebox">
                <label for="fileInput">Upload</label>
                <input id="fileInput" type="file" name="uploadFile" multiple >
              </div>`);
                        //삭제버튼 활성화
                        document
                            .querySelectorAll(".uploadResult ul li button")
                            .forEach((item) => {
                            if (item instanceof HTMLElement) {
                                item.style.display = "block";
                            }
                        });
                    }
                }
                else {
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
                            }
                            else {
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
                        }
                        else {
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
    constructor() {
        this.bno = localStorage.getItem("bno");
        this.replyData = {
            bno: String(this.bno),
            reply: "TODO regiser User",
            replyer: "TODO regiser User",
        };
        this.drawReply();
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
                        if (replyText instanceof HTMLTextAreaElement) {
                            replyText.value = "";
                        }
                    }
                    else {
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
            replyWrap.addEventListener("click", (e) => {
                var _a, _b, _c, _d, _e, _f;
                const target = e.target;
                if (target.type !== "button")
                    return;
                const rno = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.dataset.rno) !== null && _b !== void 0 ? _b : "0";
                this.replyData.rno = rno;
                const classArr = target.classList;
                let url = "";
                let message = "";
                if (classArr.contains("replyModify")) {
                    let beforeRe = (_d = (_c = target.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.querySelector("p");
                    let replyTxt = "";
                    //modify Mod Check
                    if (!target.classList.contains("changeMod")) {
                        target.classList.add("changeMod");
                        debugger;
                        const promp = prompt("변경할 내용일 입력해주세요.", (_e = beforeRe === null || beforeRe === void 0 ? void 0 : beforeRe.textContent) !== null && _e !== void 0 ? _e : "");
                        if (beforeRe instanceof HTMLElement) {
                            beforeRe.innerText = promp !== null && promp !== void 0 ? promp : "";
                        }
                        target.textContent = "Change";
                        return;
                    }
                    url = "modifyReply";
                    message = "수정";
                    //this.replyData.replyer = "TODO Make Login Service";
                    this.replyData.reply =
                        (_f = beforeRe === null || beforeRe === void 0 ? void 0 : beforeRe.textContent) !== null && _f !== void 0 ? _f : "수정에 문제가 발생하였습니다.d";
                    target.classList.remove("changeMod");
                }
                else if (classArr.contains("replyDelete")) {
                    //delete
                    url = "deleteReply";
                    message = "삭제";
                }
                else {
                    alert("Error");
                    return;
                }
                fetch(`/reply/${url}`, {
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
                        alert(`${message}에 성공하였습니다.`);
                    }
                    else {
                        alert(`${message}에 실패하였습니다`);
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
            if (!result.result.length)
                return;
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
                              ${i["updateDate"]}</small>`;
                    HTMLLiElem += "</div>";
                    HTMLLiElem += `<div class="replyBody">`;
                    HTMLLiElem += `<p>${i["reply"]}</p>`;
                    HTMLLiElem += `<div class="btnWrap" data-rno='${i["rno"]}'>`;
                    HTMLLiElem += `<button type="button" class="btn btn-default replyModify">Modify</button>`;
                    HTMLLiElem += `<button type="button" class="btn btn-default replyDelete">Delete</button>`;
                    HTMLLiElem += `</div>`;
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
//# sourceMappingURL=get.js.map