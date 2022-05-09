window.onload = function () {
  new Register();
};
type regidObj = {
  title: string;
  writer: string;
  content: string;
};

class Register {
  private title = document.querySelector(
    "input[name=title]"
  ) as HTMLInputElement;
  private content = document.querySelector(
    "textarea[name=content]"
  ) as HTMLTextAreaElement;
  private writer = document.querySelector(
    "input[name=writer]"
  ) as HTMLInputElement;
  constructor() {
    document.querySelector("#submit")?.addEventListener("click", () => {
      let regidObj: regidObj = {
        title: this.title.value,
        writer: this.content.value,
        content: this.writer.value,
      };
      //console.log(regidObj);
    });
    document.querySelector("#reset")?.addEventListener("click", () => {
      alert("reset");
    });
  }
}
