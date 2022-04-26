"use strict";
window.onload = function () {
    new Register();
};
class Register {
    constructor() {
        var _a, _b;
        (_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            alert("submit");
        });
        (_b = document.querySelector("#reset")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            alert("reset");
        });
    }
}
//# sourceMappingURL=register.js.map