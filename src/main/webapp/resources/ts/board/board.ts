window.onload = function () {
  fetch("/board/getList", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => drawGrid(data))
    .catch((error) => console.log(error));
};

// type test {
//   'a' :number,
//   'b' :number,
// }

/**
 * @description : json으로 받아온 데이터를 그리는 함수
 */
function drawGrid(data: test) {
  const container = document.querySelector("#board");
  let htmlCode: string = "";
  for (let i in data) {
    htmlCode += `<tr data-id=${data[i]["bno"]}>`;
    htmlCode += "<td>";
    htmlCode += Number(i) + 1;
    htmlCode += "</td>";
    htmlCode += "<td>";
    htmlCode += data[i]["title"];
    htmlCode += "</td>";
    htmlCode += "<td>";
    htmlCode += data[i]["writer"];
    htmlCode += "</td>";
    htmlCode += "<td>";
    htmlCode += data[i]["regdate"];
    htmlCode += "</td>";
    htmlCode += "<td>";
    htmlCode += data[i]["updatedate"];
    htmlCode += "</td>";
    htmlCode += "</tr>";
  } //for
  container?.insertAdjacentHTML("afterbegin", htmlCode);
}

document.querySelector("#board")?.addEventListener("click", (e: any) => {
  let data = e.target.parentElement.getAttribute("data-id");
  console.log(data);
});
