"use strict";
window.onload = function () {
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
                writer: this.content.value,
                content: this.writer.value,
            };
            //console.log(regidObj);
        });
        (_b = document.querySelector("#reset")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            alert("reset");
        });
    }
}
//# sourceMappingURL=register.js.map