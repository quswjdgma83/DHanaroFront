const http = require("http");
const host = "127.0.0.1";
const port = 4000;
const url = require("url");
//GET방식으로 전달된 문자열을 parsing해서 json으로 만들어준다.

let server = http.createServer((req, res) => {
  //브라우저에서 서버로 접근하면 이 함수가 호출된다.
  //req: request객체 - 브라우저에서 보내는 요청 정보를 담고있는 객체이다.
  //res: 서버에서는 request 객체에 정보를 담아 브라우저로 전송한다.
  console.log(req.method);
  console.log(req.url);
  let pathName = url.parse(req.url).pathname;
  if (req.method == "GET") {
    //GET방식일 때는 이렇게 string

    if (pathName == "/") {
      let query = url.parse(req.url, true).query;
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(`<h1>${query.name} ${query.age}</h1>`);
    } else if (pathName == "/add") {
      let query = url.parse(req.url, true).query;
      let x = parseInt(query.x);
      let y = parseInt(query.y);
      //Spring -> DispatchServlet 라는 클래스
      //http://127.0.0.1:4000/add?x=4&y=5
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h1>${x} + ${y} = ${x + y}</h1>`);
    } else if (pathName == "/gugu") gugu(req, res);
    else {
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>POST 요청 처리</h1>");
    }
    //end 함수가 호출되면 더이상 브라우저로 정보를 전송해서는 안된다.
    //보내고자 하는 정보가 더 많을 때는 write 함수를 이용해 정보를 계속 보내고 마지막에 end함수를 호출해야 한다.
  }
});

server.listen(port, host, () => {
  console.log(`Server start at http://${host}:${port}`);
});

function gugu(req, res) {
  let query = url.parse(req.url, true).query;
  let dan = query.dan;

  let result = "";
  for (i = 1; i < 9; i++) {
    result += `<h1>${dan} X ${i} = ${dan * i} <br/></h1>`;
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(result);
}

/* 
node: npm, yarn
python: pip

라이브러리를 설치할 때 시스템을 건드리는 라이브러리가 있을때가 있다. 이때는 관리자 권한이 있어야 제대로 설치가 된다.

cmd -> 마우스 오른쪽 -> 관리자 원한
VS code의 터미널 창도 VS code를 관리자 권한으로 실행하면 관리자권한이 되어서 설치 가능.
*/
