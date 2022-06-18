"use strict";
window.onload = () => {
    new Register();
};
class Register {
    constructor() {
        var _a, _b;
        this.title = document.querySelector("input[name=title]");
        this.content = document.querySelector("textarea[name=content]");
        this.writer = document.querySelector("input[name=writer]");
        (_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            let regidObj = {
                title: this.title.value,
                content: this.content.value,
                writer: this.writer.value,
            };
            this.register(regidObj);
        });
        (_b = document.querySelector("#reset")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            alert("reset");
        });
    }
    register(data) {
        fetch("/board/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
            let obj = result;
            if (obj.result === 1) {
                alert("등록에 성공하였습니다.");
                location.href = "/board/list";
            }
            else {
                alert("등록에 실패하였습니다.");
            }
        })
            .catch((error) => console.log(error));
    }
}
//# sourceMappingURL=register.js.map