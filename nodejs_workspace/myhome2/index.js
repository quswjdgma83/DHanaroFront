import http from "http";
import fs from "fs";
import ejs from "ejs"; //npm install ejs
import url from "url";
import path from "path";
//path:가상url http://localhost:3000/
//func:url 요청이 왔을때 처리를 담당할 함수 주소
//filename:"요청에 대해서 응답할 html 파일, 전체 경로는 상수나 다른 값으로 가공해서
const hostname = "127.0.0.1";
const port = 3000;
const hosturl = `${hostname}:${port}`;

const pathMap = [
  { path: "/", func: index, filename: "index" },
  { path: "/member", func: member, filename: "member/member_join" },
  { path: "/member/join", func: member_join, filename: "" },
  { path: "/member/list", func: member_list, filename: "member/member_list" },
];
//ejs => html 문서와 json객체를 합쳐서 새로운 html을 만든다
//       렌더링
//createServer 클라이언트가 접속요청을 하면 자신한테 전달된 callback함수 호출
let server = http.createServer((request, response) => {
  let pathName = url.parse(request.url, true).pathname;
  if (request.method == "GET") {
    let idx = pathMap.findIndex((item) => item.path == pathName);
    if (idx != -1) {
      request["filename"] = pathMap[idx].filename;
      pathMap[idx].func(request, response);
    }
  } else if (request.method == "POST") {
    let idx = pathMap.findIndex((item) => item.path == pathName);
    if (idx != -1) {
      request["filename"] = pathMap[idx].filename;
      pathMap[idx].func(request, response);
    }
  } else {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end("<h1>한글도가능</h1>");
  }
});
server.listen(3000, "127.0.0.1", () => {
  console.log("http://127.0.0.1:3000 start");
  //listen 이 완료되면 호출된다.
});

//해당 파일을 폴더로부터 읽어서 전달해주는 함수
async function readFile(filename) {
  //파일의 크기가 작을 경우에는 동기로 읽어도 된다. 비동기로 읽은 경우에 이 함수에서는 바로 return이 안된다.
  //그럴 경우에 async나 await을 사용해야 한다.
  //readFile - 비동기
  let file = path.resolve() + "/html/" + filename + ".html";
  let filedata = await fs.promises.readFile(file, "utf-8");

  return filedata; //async가 붙은 함수는 Promise 객체로 반환한다.
}

async function index(request, response) {
  let fileData = await readFile(request["filename"]); //반환값이 Promise타입
  //then 구문을 써서 처리하던가 아니면 await을 이용해 작업이 완료할 때 까지 대기를 해야한다. await을 쓸 결우 주의사항은
  //함수에 aswnc가 붙어 있어야한다. 반대로 말하면 aswnc가 붙은 함수 안에서만 await 구문을 사용할 수 있다.
  console.log(request["filename"]);
  console.log(fileData);
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  response.end(fileData);
}

async function member(request, response) {
  let fileData = await readFile(request["filename"]); //반환값이 Promise타입
  console.log(request["filename"]);
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  response.end(fileData);
}

let memberData = [
  {
    userid: "quswjdgma83",
    password: "bs1187",
    username: "변정흠",
    phone: "010-5778-3842",
    email: "quswjdgma83@gmail.com",
  },
  {
    userid: "quswjdgma83",
    password: "bs1187",
    username: "변정흠2",
    phone: "010-5778-3842",
    email: "",
  },
  {
    userid: "quswjdgma83",
    password: "bs1187",
    username: "변정흠3",
    phone: "010-5778-3842",
    email: "",
  },
];
function member_join(request, response) {
  //데이터를 post방식으로 처리해야 한다.
  //POST방식은 헤더로는 URL만 보냄, body- 나머지 정보들
  //get 방식은 header에 모든 정보가 다 전송된다.
  let body = "";
  request.on("data", (data) => {
    body += data;
  });
  request.on("end", () => {
    let params = new URLSearchParams(body);
    const obj = Object.fromEntries(params);
    console.log(obj);
    memberData.push(obj);

    console.log(memberData);
    // response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

    //페이지이동 => url이 바뀌어야 한다.
    response.writeHead(302, {
      Location: "http://localhost:3000/",
    });
    response.end();
  });
  //등록 과정을 거치고 나서, 페이지를 리다이렉트 시켜야 한다.
  //등록을 하고 나서 F5를 누르면 request가 다시 나오면 안된다.
}

async function member_list(request, response) {
  let fileData = await readFile(request["filename"]);
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  let result = ejs.render(fileData, { member_list: memberData });
  response.end(result);
}
