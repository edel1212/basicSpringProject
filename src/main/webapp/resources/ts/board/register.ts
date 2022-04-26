window.onload = function () {
  new Register();
};

class Register {
  constructor() {
    document.querySelector("#submit")?.addEventListener("click", () => {
      alert("submit");
    });
    document.querySelector("#reset")?.addEventListener("click", () => {
      alert("reset");
    });
  }
}
