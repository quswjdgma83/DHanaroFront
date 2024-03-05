const http = require("http");
const host = "127.0.0.1";
const port = 4000;
const { response } = require("express");
const url = require("url");

let server = http.createServer((req, res) => {
  //브라우저에서 서버로 접근하면 이 함수가 호출된다.
  //req: request객체 - 브라우저에서 보내는 요청 정보를 담고있는 객체이다.
  //res: 서버에서는 request 객체에 정보를 담아 브라우저로 전송한다.
  console.log(req.method);
  console.log(req.url);
  let pathName = url.parse(req.url).pathname;

  if (req.method == "POST") {
    if (pathName == "/") {
      callProcess(req, res);
    } else if (pathName == "/add") {
      add(req, res);
    }
  } else {
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>This is First Server</h1>");
  }
  //end 함수가 호출되면 더이상 브라우저로 정보를 전송해서는 안된다.
  //보내고자 하는 정보가 더 많을 때는 write 함수를 이용해 정보를 계속 보내고 마지막에 end함수를 호출해야 한다.
});

server.listen(port, host, () => {
  console.log(`Server start at http://${host}:${port}`);
});

function callProcess(req, res) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    var data = new URLSearchParams(body.toString());
    //JSON구조 아님
    console.log(data);
    console.log("name" + data.get("name"));
    console.log("age" + data.get("age"));

    res.writeHead(200, { "Content-Type": "text/html" });
    var result = `<h1>이름: ` + data.get("name") + `</h1>`;
    result += `<h1>나이: ` + data.get("age") + `</h1>`;
    res.end(result);
  });
}

function add(req, res) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    var data = new URLSearchParams(body.toString());

    let x = parseInt(data.get("x"));
    let y = parseInt(data.get("y"));
    res.writeHead(200, { "Content-Type": "text/html" });
    var result = `<h1>${x} + ${y} =  ${x + y}</h1>`;
    console.log(result);
    res.end(result);
  });
}
