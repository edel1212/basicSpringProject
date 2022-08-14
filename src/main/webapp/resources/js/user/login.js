"use strict";
/***
 * @Description : Login Class
 */
class Login {
    constructor() {
        var _a;
        const csfrHeader = String(localStorage.getItem("csrfHeader"));
        const csrfToken = String(localStorage.getItem("csrfTokenValue"));
        //login Event
        (_a = document.querySelector("#loginBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.logingReq(csfrHeader, csrfToken);
        });
    }
    logingReq(csfrHeader, csrfToken) {
        //id
        const loginIdEle = document.querySelector("#loginId");
        let loginIdVal = "";
        if (loginIdEle instanceof HTMLInputElement) {
            loginIdVal = loginIdEle.value;
        }
        //pw
        const loginPwEle = document.querySelector("#loginPw");
        let loginPwVal = "";
        if (loginPwEle instanceof HTMLInputElement) {
            loginPwVal = loginPwEle.value;
        }
        //Remember-me
        const rememEle = document.querySelector("#customCheck");
        let rememEleVal = false;
        if (rememEle instanceof HTMLInputElement) {
            rememEleVal = rememEle.checked;
        }
        console.log("csfrHeader", csfrHeader);
        console.log("csrfToken", csrfToken);
        /**해당 URL 경로는 security에 정의되어 있음 */
        fetch("/loginReq", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({
                "'username'": loginIdVal,
                "'password'": loginPwVal,
                "remember-me": rememEleVal,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log("Success!"))
            .catch((error) => console.log(error));
    }
}
//new Login();
//# sourceMappingURL=login.js.map