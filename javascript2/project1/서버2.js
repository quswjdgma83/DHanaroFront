const http = require("http");
const host = "127.0.0.1";
const port = 4000;
const fs = require("fs");

let server = http.createServer((req, res) => {
  //브라우저에서 서버로 접근하면 이 함수가 호출된다.
  //req: request객체 - 브라우저에서 보내는 요청 정보를 담고있는 객체이다.
  //res: 서버에서는 request 객체에 정보를 담아 브라우저로 전송한다.
  console.log(req.method);
  if (res.method == "GET") {
    fs.readFileSync("./html/input.html", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "test/html");
      console.log(data);
      res.end(data);
    });
  } else {
    res.setHeader("Content-Type", "test/html");
    res.end("<h1>post</h1>");
  }
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>This is First Server</h1>");
  //end 함수가 호출되면 더이상 브라우저로 정보를 전송해서는 안된다.
  //보내고자 하는 정보가 더 많을 때는 write 함수를 이용해 정보를 계속 보내고 마지막에 end함수를 호출해야 한다.
});

server.listen(port, host, () => {
  console.log(`Server start at http://${host}:${port}`);
});
