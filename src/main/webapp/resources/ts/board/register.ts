window.onload = () => {
  new Register();
};
type RegiType = {
  title: string;
  content: string;
  attachList: Array<AttachObj>;
};

type RegiResult = {
  result: number;
};

let fileObj: Array<AttachObj> = [];

class Register {
  private title = document.querySelector(
    "input[name=title]"
  ) as HTMLInputElement;
  private content = document.querySelector(
    "textarea[name=content]"
  ) as HTMLTextAreaElement;
  constructor() {
    document.querySelector("#submit")?.addEventListener("click", () => {
      let regidObj: RegiType = {
        title: this.title.value,
        content: this.content.value,
        attachList: fileObj,
      };
      this.register(regidObj);
    });
    document.querySelector("#reset")?.addEventListener("click", () => {
      alert("reset");
    });
  }

  register(data: RegiType) {
    const csrfEle = document.querySelector("#csrfToken");
    let csrfToken = "";
    if (csrfEle instanceof HTMLInputElement) {
      csrfToken = csrfEle.value;
    }
    fetch("/board/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
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

document.querySelector("#fileInput")?.addEventListener("change", (e) => {
  /** 데이터를 담을 객체 */
  let formData = new FormData();
  /** target Input */
  let inputFile = document.querySelector("input[name='uploadFile']");

  if (inputFile instanceof HTMLInputElement) {
    /** 배열 형태로 데이터를 나열 */
    const files = inputFile.files as any;

    for (let i of files) {
      //검사
      if (!checkExtension(i.name, i.size)) return;
      //FormData 객체에 파일을 주입
      formData.append("uploadFile", i);
    } //for

    for (let key of formData.keys()) {
      console.log(key);
    }
    for (let value of formData.values()) {
      console.log(value);
    }

    const csrfEle = document.querySelector("#csrfToken");
    let csrfToken = "";
    if (csrfEle instanceof HTMLInputElement) {
      csrfToken = csrfEle.value;
    }
    fetch("/board/uploadAction", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        //file input 초기화
        const fileInput = document.querySelector("input[name='uploadFile']");
        if (fileInput instanceof HTMLInputElement) {
          fileInput.value = "";
        }

        //파일 목록 생성
        const uploadRstUL = document.querySelector(".uploadResult ul");
        let str = "";
        data.forEach((obj: AttachObj) => {
          const FileDownCallPath = encodeURIComponent(
            obj["uploadPath"] + "/" + obj["uuid"] + "_" + obj["fileName"]
          );

          if (!obj["fileType"]) {
            str +=
              "<li style='display:flex'><img style='width:25px;margin-right:5px;' src='/resources/img/file.png'>";
            str += "<a href='";
            str += "/board/download?fileName=" + FileDownCallPath;
            str += "'>";
            str += obj["fileName"];
            str += "</a>";
            str +=
              "<button type='button' style='background: none;border: none;color: red;' data-file=";
            str +=
              FileDownCallPath +
              " data-type='file' " +
              "data-uuid=" +
              obj["uuid"];
            str += ">X</button>";
            str += "</li>";
          } else {
            const thumFileCallPath = encodeURIComponent(
              obj["uploadPath"] +
                "/" +
                "s_" +
                obj["uuid"] +
                "_" +
                obj["fileName"]
            );
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
              "<button type='button' style='background: none;border: none;color: red;' data-file=";
            str +=
              thumFileCallPath +
              " data-type='image' " +
              "data-uuid=" +
              obj["uuid"];
            str += ">X</button>";
            str += "</li>";
          } //if-else
          /**전역변수에 파일 등록 */
          fileObj.push(obj);
        });

        if (uploadRstUL instanceof HTMLUListElement) {
          uploadRstUL.insertAdjacentHTML("beforeend", str);
        }

        document
          .querySelector(".uploadResult ul")
          ?.addEventListener("click", (e) => {
            const target = e.target as any;
            if (target.nodeName !== "BUTTON") {
              return;
            }
            const data = target.dataset.file;
            const type = target.dataset.type;
            const uuid = target.dataset.uuid;
            fetch("/board/deleteFile", {
              method: "POST",
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
              },
              body: JSON.stringify({ fileName: data, type: type }),
            })
              .then((response) => {
                console.log(response);
              })
              .then((result) => {
                //fileObj 삭제
                for (let i = 0; i < fileObj.length; i++) {
                  if (fileObj[i].uuid === uuid) {
                    fileObj.splice(i, 1);
                  }
                }

                target.parentElement.remove();
              })
              .catch((error) => console.log(error));
          });
      })
      .catch((error) => console.log(error));
  }
});
