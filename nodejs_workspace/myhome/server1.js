import http from "http";
import fs from "fs";
import ejs from "ejs"; //npm install ejs
import url from "url";

//함수 맵을 만들자
//일일이 if문 사용말고 for문써서 해당 url이 오면 함수를 호출하자
const pathMap = [
  { path: "/", func: index },
  { path: "/test", func: test },
  { path: "/add", func: add },
  { path: "/add_result", func: add_result },
  { path: "/weekpay", func: weekpay },
  { path: "/weekpay_result", func: weekpay_result },
  { path: "/weekpay_proc", func: weekpay_proc },
  //결과를 html이 아니고 JSON으로 보낸다. Restful API를 만들자
  //id 중복체크 - json응답, iframe, pop up 창 - 현재 2개는 모바일에서 문제가 돼서 안씀
  { path: "/idcheck", func: idCheck }, //userid를 받아서 true 또는 false를 반환
  //회원가입페이지 이동
  { path: "/member", func: member }, //사용자에게 입력을 받는 페이지들은 프론트엔드로
  //회원가입 - 데이터를 받아가서 일을하는 페이지는 아예 페이지 전체바꾸기 ajax 둘다
  //프론트엔드 <=> 백엔드
  { path: "/regist", func: regist }, //axios를 써서 => 결과가 JSON
];

//ejs => html 문서와 json객체를 합쳐서 새로운 html을 만든다
//       렌더링
//createServer 클라이언트가 접속요청을 하면 자신한테 전달된 callback함수 호출
let server = http.createServer((request, response) => {
  let pathName = url.parse(request.url, true).pathname;
  if (request.method == "GET") {
    let idx = pathMap.findIndex((item) => item.path == pathName);
    if (idx != -1) {
      pathMap[idx].func(request, response);
    }
  } else if (request.method == "POST") {
  } else {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end("<h1>한글도가능</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("http://127.0.0.1:3000 start");
  //listen 이 완료되면 호출된다.
});

//nodemon - node모니터링 -> 소스 바뀌면 자동으로 재시작을 한다
//우분트에서  putty 로 들어가서 접속해서 p2라는 프로그램 또는 ngnix 엔진에 올리기도 하는데
//p2를 설치하고 가동시키자 - p2 : 우분트에서 node를 데몬으로 실행시키게 한다.

//npm install -g nodemon
//nodemon server1

function index(request, response) {
  //1.html 파일 읽기
  fs.readFile("./html/index.html", "utf-8", (error, data) => {
    if (error) {
      console.log("파일을 찾을 수 없습니다.");
      return;
    }

    let result = ejs.render(data); //현재는 아무값도 전달하지 않아서 render를 거치나
    //안거치나 똑같음
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(result);
  });
}

function test(request, response) {
  console.log("#@@##@");
  //1.html 파일 읽기
  let params = url.parse(request.url, true).query; //JSON형태로 저장된다.

  fs.readFile("./html/test.html", "utf-8", (error, data) => {
    if (error) {
      console.log("파일을 찾을 수 없습니다.");
      return;
    }
    //ejs.render(파일내용: string, {}: 보낼데이터)
    // {name: "Tom"} => html 문서에서는 <%=name%>
    // {name: "Tom"} => html 문서에서는 |name => jade, pug엔진, 거의 안씀
    let result = ejs.render(data, params); //현재는 아무값도 전달하지 않아서 render를 거치나
    //안거치나 똑같음
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(result);
  });
}

function add(request, response) {
  console.log("#@@##@");
  //1.html 파일 읽기
  fs.readFile("./html/add.html", "utf-8", (error, data) => {
    if (error) {
      console.log("파일을 찾을 수 없습니다.");
      return;
    }
    let result = ejs.render(data); //현재는 아무값도 전달하지 않아서 render를 거치나
    //안거치나 똑같음
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(result);
  });
}

function add_result(request, response) {
  console.log("#@@##@");
  //get 방식 파싱 --> form 태그를 타고 input태그의 name속성이
  // /add_result?x=5&y=8
  let params = url.parse(request.url, true).query; //JSON형태로 저장된다.
  console.log(params);
  fs.readFile("./html/add_result.html", "utf-8", (error, data) => {
    if (error) {
      console.log("파일을 찾을 수 없습니다.");
      return;
    }
    let yunsan; // yunsan 변수를 let 키워드로 선언
    let add_result; // add_result 변수를 let 키워드로 선언

    if (params.operator == "1") {
      yunsan = "+";
      add_result = parseInt(params.x) + parseInt(params.y);
    } else if (params.operator == "2") {
      yunsan = "-";
      add_result = parseInt(params.x) - parseInt(params.y);
    } else if (params.operator == "3") {
      yunsan = "*";
      add_result = parseInt(params.x) * parseInt(params.y);
    } else if (params.operator == "4") {
      yunsan = "/";
      add_result = parseInt(params.x) / parseInt(params.y);
    }
    //params: {x: 5m y: 7, result: 12} ==> {...params}로 축약 가능
    let result = ejs.render(data, {
      ...params,
      result: add_result,
      yunsan: yunsan,
    });
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(result);
  });
}

/*
  <a href="/weekpay">주급계산</a>
  weekpay.html
  name
  work_time
  per_pay
  weekpay_result.html
*/

function weekpay(request, response) {
  fs.readFile("./html/weekpay.html", "utf-8", (error, data) => {
    if (error) {
      console.log("파일을 찾을 수 없습니다.");
      return;
    }
    let result = ejs.render(data); //현재는 아무값도 전달하지 않아서 render를 거치나
    //안거치나 똑같음
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(result);
  });
}

function weekpay_result(request, response) {
  let params = url.parse(request.url, true).query; //JSON형태로 저장된다.
  console.log(params);
  fs.readFile("./html/weekpay_result.html", "utf-8", (error, data) => {
    if (error) {
      console.log("파일을 찾을 수 없습니다.");
      return;
    }

    weekpay_result = parseInt(params.work_time) * parseInt(params.per_pay);

    //params: {x: 5m y: 7, result: 12} ==> {...params}로 축약 가능
    let result = ejs.render(data, {
      ...params,
      result: weekpay_result,
    });
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(result);
  });
}

// weekpay_proc?name=Tom&work_time=10&per_pay=1000
function weekpay_proc(request, response) {
  //페이지이동만
  let params = url.parse(request.url, true).query; //우리가 보낸 정보가 여기 있음
  console.log(params);
  let name = params.name;
  let work_time = params.work_time;
  let per_pay = params.per_pay;
  let week_pay = work_time * per_pay;
  let result = {
    name: name,
    work_time: work_time,
    per_pay: per_pay,
    week_pay: week_pay,
  };

  //content-type이 application/json 이어야 한다 => @RestControler가 대신 함
  response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  console.log(result);
  //JSON객체를 전달할때 String타입으로 전환해서 보내야만 한다
  response.end(JSON.stringify(result)); //결과를 json 형태로 보내야 한다.
}

function member(request, response) {
  fs.readFile("./html/member.html", "utf-8", (error, data) => {
    if (error) {
      console.log("파일을 찾을 수 없습니다.");
      return;
    }
    let result = ejs.render(data);
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(result);
  });
}

let memberData = []; //전역메모리

function idCheck(request, response) {
  //페이지이동만
  let params = url.parse(request.url, true).query; //우리가 보낸 정보가 여기 있음
  console.log(params);
  let userid = params.userid;
  //test라는 아이디는 사용 불가
  let result = {};
  let idx = memberData.findIndex((mem) => {
    return mem.userid == userid;
  });
  if (idx != -1) {
    //존재한다.
    result = { useyn: "N", msg: "test 사용아이디는 사용 못함" }; //useyn 사용 가능하면 ㅛ
  } else {
    result = { useyn: "Y", msg: "사용가능한 아이디입니다." };
  }

  //content-type이 application/json 이어야 한다 => @RestControler가 대신 함
  response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  response.end(JSON.stringify(result)); //결과를 json 형태로 보내야 한다.
}

function regist(request, response) {
  let params = url.parse(request.url, true).query;

  memberData.push(params);
  console.log(memberData);
  let result = { result: "SUCCESS", msg: "등록되었습니다" };

  response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  response.end(JSON.stringify(result));
}
