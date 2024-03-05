var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//외부 파일을 불러온다. routes 폴더 아래에 index.js
//users.js 파일이 있는데 각각 url 넘어오면 router들이 별도 처리를 담당한다.
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let boardRouter = require("./routes/board"); //외부모듈 불러오기

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//파일 업로드 폴더를 만들어서 외부로 노출하기
//파일을 업로드 할 때는 반드시 물리적 경로가 필요하다
//http://localhost:3000/uploads 했을 때 프로젝트 가동폴더/uploads에 있는 파일들이 모두 접근 가능하다
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/board", boardRouter);
app.use("/uploads", express.static(__dirname + "/uploads")); // 업로드 한것을 내보내려고 한다.
/*
파일 관리 테이블을 별도로 만들어서 관리를 한다.
디비에 동영상이나 이미지를 직접 저장할 수도 있는데 우리나라는 별도의 폴더를 두고 폴더에 업로드하고 디비에는 위치와 파일명
등 찾아올 수 있는 정보를 별도로 저장하는 형태를 취한다. 

게시판에 글을 쓴다. => /board/list /board/write
CRUD-create, read, update, delete 단위로 별도의 파일로 가져가자
라우터라고도 부른다. 컨트롤러는 CRUD당 하나씩
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); //next라는 세번째 매개변수를 통해서 현재 함수와 물리적으로 바로 다음에 있는 함수를 호출함
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
