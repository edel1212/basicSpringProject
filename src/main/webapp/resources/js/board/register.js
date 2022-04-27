"use strict";
window.onload = function () {
    new Register();
};
class Register {
    constructor() {
        var _a, _b;
        (_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            let boardObj;
            let form = document.querySelector("#registerForm");
            let formArr = form === null || form === void 0 ? void 0 : form.elements;
            formArr === null || formArr === void 0 ? void 0 : formArr.item;
            formArr === null || formArr === void 0 ? void 0 : formArr.namedItem;
            debugger;
            alert("submit");
        });
        (_b = document.querySelector("#reset")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            debugger;
            alert("reset");
        });
    }
}
//# sourceMappingURL=register.js.map