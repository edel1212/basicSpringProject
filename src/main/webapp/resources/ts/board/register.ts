window.onload = () => {
  new Register();
};
type RegiType = {
  title: string;
  writer: string;
  content: string;
};

type RegiResult = {
  result: number;
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
      let regidObj: RegiType = {
        title: this.title.value,
        writer: this.content.value,
        content: this.writer.value,
      };
      this.register(regidObj);
    });
    document.querySelector("#reset")?.addEventListener("click", () => {
      alert("reset");
    });
  }

  register(data: RegiType) {
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
        let obj: RegiResult = result;
        if (obj.result === 1) {
          alert("등록에 성공하였습니다.");
          location.href = "/board/list";
        } else {
          alert("등록에 실패하였습니다.");
        }
      })
      .catch((error) => console.log(error));
  }
}
