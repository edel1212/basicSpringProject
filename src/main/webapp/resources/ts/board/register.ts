window.onload = function () {
  new Register();
};
type boardObj = {
  title: string;
  writer: string;
  content: string;
};

class Register {
  constructor() {
    document.querySelector("#submit")?.addEventListener("click", () => {
      let boardObj: boardObj;
      let form: HTMLFormElement | null =
        document.querySelector("#registerForm");
      let formArr: HTMLFormControlsCollection | undefined = form?.elements;
      formArr?.item;
      formArr?.namedItem;
      debugger;
      alert("submit");
    });
    document.querySelector("#reset")?.addEventListener("click", () => {
      debugger;
      alert("reset");
    });
  }
}
