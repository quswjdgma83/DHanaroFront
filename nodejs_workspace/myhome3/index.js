import express from "express";
import ejs from "ejs";
//모듈 import

let app = express(); //express 객체를 생성한다.

//미들웨어 - 중간에 미들웨어를 거친다. 미들웨어의 유/무와 상관없이 다른 코드들은 각자 자기 업무를 실행하면 된다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//모든 응답처리를 담당한다.
//use 함수에 파라미터로 콜백함수를 준다.
//(req, res, next); 세번째 매개변수인 next는 체인을 만들어서 이번함수 => 다음함수 => 그 다음함수
//식으로 여러번 거쳐서 처리될 때 유용하다. next => 잘 안씀, 의미가 중요함.
app.use("/", (req, res, next) => {
  next(); //바로 아해 url 없는 함수한테 던짐
});
app.use("/test", (req, res, next) => {
  next(); //바로 아해 url 없는 함수한테 던짐
});

//어떤 경우에든 url은 중복되면 안된다.
//json 전송하기
app.get("/data", (req, res) => {
  let data = { product_name: "새우깡", product_price: 4000 };
  //   res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  //   res.end("<h1>GET 방식 전달</h1>");
  res.send(data);
});

//어떤 경우에든 url은 중복되면 안된다.
app.get("/add", (req, res) => {
  console.log(typeof req.query, req.query);
  let x = req.query.x;
  let y = req.query.y;
  res.send({ x: x, y: y, result: parseInt(x) + parseInt(y) });
});

app.get("/add2/:x/:y/:msg", (req, res) => {
  let x = req.params.x;
  let y = req.params.y;
  let msg = req.params.msg;
  res.send({ x: x, y: y, result: parseInt(x) + parseInt(y), msg: msg });
});

//html 파일 만들어서 form 태그를 통해서 POST로 전송하거나
//curl이나 postman으로 접근해야 한다
//브라우저 Url은 무조건 get 방식임
app.post("/post", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>POST 방식 전달</h1>");
});

//postman에서 호출해야 한다.
//스프링부트의 경우 @RequestBody => json을 처리하고자 할 때
//x-www-form-urlencoded는 그냥 받음
/*
    get: Header에 모든 정보를
        /add?x=4&y=5 => query
        /add/4/5 => params
    post: Header에 간단한 url 말고는 안보낸다.
        1. multipart/form-data: 파일 업로드시 form 태그의 post + enctype = "multipart/form-data"
            Ajax의 경우에는 form 태그 대신에 자바스크립트가 제공하는 객체 FormData 객체로 담아 보낸다.
        2. x-www-form-urlencoded: 데이터를 json 형태로 전송한다.
        3. json 방식이 있다. 데이터를 json 형태로 전송한다. 직접 json 형태로 데이터를 만들어야 한다.
*/
app.post("/userinfo", (req, res) => {
  let name = req.body.name;
  let age = req.body.age;

  //   res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  //send 함수가 적절한 헤더를 알아서 보내준다. writeHead를 호출하지 않는다.
  res.send({ name: name, age: age, result: "OK" });
});
/* 
    POST 방식은 body부분을 따로 받아서 처리 작업을 해야한다.
    bodyParser를 제공해준다. 별도로 설치를 하고 모든 요청에 bodyParser를 통과했어야 했다.
    => 좀 더 편하게 하기 위해 express 프레임 워크에 bodyParser가 내장이 되었음

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    이 두 구문이 있어야 bodyParser가 동작을 한다.

*/

//url 요청이 없을 경우에 사용한다. - 맨 밑에 두어야 한다.
app.use((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>Hi Express</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
